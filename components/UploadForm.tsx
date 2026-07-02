'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, ImageIcon } from 'lucide-react';
import { BookUploadFormValues } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES } from '@/lib/constants';
import { UploadSchema } from '@/lib/zod';
import LoadingOverlay from './LoadingOverlay';
import FileUploader from './FileUploader';
import VoiceSelector from './VoiceSelector';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { checkBookExists, createBook, saveBookSegments } from '@/lib/actions/book.actions';
import { toast } from 'sonner';
import { parsePDFFile } from '@/lib/utils';
import { upload } from '@vercel/blob/client';

const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { userId } = useAuth();
    const router = useRouter();

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            title: '',
            author: '',
            persona: '',
            pdfFile: undefined,
            coverImage: undefined,
        },
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isSubmitting ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isSubmitting]);

    const onSubmit = async (data: BookUploadFormValues) => {
        if (!userId) return toast.error('Please login to upload books');
        setIsSubmitting(true);
        try {
            const existsCheck = await checkBookExists(data.title);
            if (existsCheck.exists && existsCheck.book) {
                toast.info("Book with same title already exists.");
                router.push(`/books/${existsCheck.book.slug}`);
                return;
            }

            const fileTitle = data.title.replace(/\s+/g, '-').toLowerCase();
            const parsedPDF = await parsePDFFile(data.pdfFile);

            if (parsedPDF.content.length === 0) {
                toast.error("Failed to parse PDF.");
                return;
            }

            const uploadedPdfBlob = await upload(fileTitle, data.pdfFile, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                contentType: 'application/pdf'
            });

            let coverUrl: string;
            if (data.coverImage) {
                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, data.coverImage, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    contentType: data.coverImage.type
                });
                coverUrl = uploadedCoverBlob.url;
            } else {
                const response = await fetch(parsedPDF.cover);
                const blob = await response.blob();
                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, blob, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    contentType: 'image/png'
                });
                coverUrl = uploadedCoverBlob.url;
            }

            const book = await createBook({
                clerkId: userId,
                title: data.title,
                author: data.author,
                persona: data.persona,
                fileURL: uploadedPdfBlob.url,
                fileBlobKey: uploadedPdfBlob.pathname,
                coverURL: coverUrl,
                fileSize: data.pdfFile.size,
            });

            if (!book.success) {
                toast.error(book.error as string || "Failed to create book");
                if (book.isBillingError) router.push("/subscriptions");
                return;
            }

            const segments = await saveBookSegments(book.data._id, userId, parsedPDF.content);
            if (!segments.success) throw new Error("Failed to save segments");

            form.reset();
            router.push(`/books/${book.data.slug}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload book. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) return null;

    if (!userId) {
        return (
            <section className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center" aria-labelledby="start-title">
                <div className="mb-8 p-4 bg-primary/5 rounded-full" aria-hidden="true">
                    <Upload className="h-10 w-10 text-primary" strokeWidth={1.5} />
                </div>
                <h1 id="start-title" className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Start your library.</h1>
                <p className="text-xl text-muted-foreground mt-4">Upload your documents to create an interactive, AI-narrated experience.</p>
                <div className="mt-12">
                    <SignInButton mode="modal">
                        <Button size="lg" className="rounded-full shadow-sm hover:shadow-md transition-all">Sign In to Upload</Button>
                    </SignInButton>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen py-8 px-2 md:py-16 md:px-6">
            {isSubmitting && <LoadingOverlay />}
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 px-2">
                    <p className="text-primary uppercase tracking-[0.25em] text-xs font-semibold">New Entry</p>
                    <h1 className="font-serif font-bold mt-2 text-2xl md:text-5xl">Add a new book</h1>
                    <p className="text-muted-foreground mt-3 max-w-lg text-sm md:text-base">
                        Upload a book, choose an AI narrator, and generate an interactive voice assistant experience.
                    </p>
                </header>

                <section className="rounded-2xl md:rounded-3xl border border-border bg-card shadow-sm p-4 md:p-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 md:gap-10">
                            <div className="space-y-8">
                                <div className="rounded-2xl border border-border bg-background p-6">
                                    <h3 className="font-semibold text-lg mb-5 flex items-center gap-2"><Upload className="h-5 w-5 text-primary" /> Book Upload</h3>
                                    <FileUploader control={form.control} name="pdfFile" label="Book PDF File" acceptTypes={ACCEPTED_PDF_TYPES} icon={Upload} placeholder="Click to upload PDF" hint="PDF file (max 50MB)" disabled={isSubmitting} />
                                </div>

                                <div className="rounded-2xl border border-border bg-background p-6 space-y-5">
                                    <h3 className="font-semibold text-lg">Book Details</h3>
                                    <FormField control={form.control} name="title" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl><Input placeholder="Thinking, Fast and Slow" {...field} aria-required="true" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="author" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Author</FormLabel>
                                            <FormControl><Input placeholder="Daniel Kahneman" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <div className="rounded-2xl border border-border bg-background p-6">
                                    <h3 className="font-semibold text-lg mb-2">Voice Assistant</h3>
                                    <FormField control={form.control} name="persona" render={({ field }) => (
                                        <FormItem>
                                            <FormControl><VoiceSelector value={field.value} onChange={field.onChange} disabled={isSubmitting} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </div>

                            <aside className="space-y-6 lg:sticky lg:top-8 h-fit">
                                <div className="rounded-2xl border border-border bg-background p-6">
                                    <h3 className="font-semibold text-lg mb-5 flex items-center gap-2"><ImageIcon className="h-5 w-5 text-primary" /> Cover Image</h3>
                                    <FileUploader control={form.control} name="coverImage" label="Cover image" acceptTypes={ACCEPTED_IMAGE_TYPES} icon={ImageIcon} placeholder="Upload cover image" hint="PNG • JPG • WEBP" disabled={isSubmitting} />
                                </div>
                                <Button type="submit" size="lg" className="w-full h-12 rounded-xl text-base font-semibold shadow-lg" aria-busy={isSubmitting}>
                                    {isSubmitting ? "Processing..." : "Begin Synthesis"}
                                </Button>
                            </aside>
                        </form>
                    </Form>
                </section>
            </div>
        </section>
    );
};

export default UploadForm;


