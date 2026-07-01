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
    const { userId } = useAuth()
    const router = useRouter()

    if (!userId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
                <div className="mb-8 p-4 bg-primary/5 rounded-full">
                    <Upload className="h-10 w-10 text-primary" strokeWidth={1.5} />
                </div>

                <div className="max-w-xl space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
                        Start your library.
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Upload your documents to create an interactive, AI-narrated experience.
                        Sign in to get started.
                    </p>
                </div>

                <div className="mt-12">
                    <SignInButton mode="modal">
                        <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-sm hover:shadow-md transition-all">
                            Sign In to Upload
                        </Button>
                    </SignInButton>
                </div>
            </div>
        );
    }


    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isSubmitting) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isSubmitting]);


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
    const onSubmit = async (data: BookUploadFormValues) => {
        if (!userId) {
            return toast.error('Please login to upload books')
        }
        setIsSubmitting(true);

        // PostHog -> Track Book Uploads...
        try {
            const existsCheck = await checkBookExists(data.title);
            if (existsCheck.exists && existsCheck.book) {
                toast.info("Book with same title already exists.");
                form.reset()
                router.push(`/books/${existsCheck.book.slug}`)
                return;
            }

            const fileTitle = data.title.replace(/\s+/g, '-').toLowerCase();
            // const pdfFile = data.pdfFile[0];
            const pdfFile = data.pdfFile;

            const parsedPDF = await parsePDFFile(pdfFile);

            if (parsedPDF.content.length === 0) {
                toast.error("Failed to parse PDF. Please try again with a different file.");
                return;
            }

            const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                contentType: 'application/pdf'
            });

            let coverUrl: string;

            if (data.coverImage) {
                // const coverFile = data.coverImage[0];
                const coverFile = data.coverImage;

                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, coverFile, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    contentType: coverFile.type
                });
                coverUrl = uploadedCoverBlob.url;
            } else {
                const response = await fetch(parsedPDF.cover)
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
                fileSize: pdfFile.size,
            });

            if (!book.success) {
                toast.error(book.error as string || "Failed to create book");
                if (book.isBillingError) {
                    router.push("/subscriptions");
                }
                return;
            }
            if (book.alreadyExists) {
                toast.info("Book with same title already exists.");
                form.reset()
                router.push(`/books/${existsCheck.book.slug}`)
                return;
            }

            const segments = await saveBookSegments(book.data._id, userId, parsedPDF.content);

            if (!segments.success) {
                toast.error("Failed to save book segments");
                throw new Error("Failed to save book segments");
            }

            form.reset();
            // router.push('/books/new');
            router.push(`/books/${book.data.slug}`);

        } catch (error) {
            console.error(error);

            toast.error("Failed to upload book. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }

    };


    if (!isMounted) return null;

    return (
        <div className="min-h-screen  py-16">
            {isSubmitting && <LoadingOverlay />}

            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="mb-12">
                    <p className="text-primary uppercase tracking-[0.25em] text-xs font-semibold">
                        New Entry
                    </p>

                    <h1
                        className="font-serif font-bold mt-2"
                        style={{
                            fontSize: "clamp(2rem,4vw,3rem)"
                        }}
                    >
                        Add a new book
                    </h1>

                    <p className="text-muted-foreground mt-3 max-w-lg">
                        Upload a book, choose an AI narrator, and generate an
                        interactive voice assistant experience.
                    </p>
                </div>

                <div className="rounded-3xl border border-border bg-card shadow-sm p-8 lg:p-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
                            <div className="space-y-8">

                                <div className="rounded-2xl border border-border bg-background p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <Upload className="h-5 w-5 text-primary" />
                                        <h3 className="font-semibold text-lg">
                                            Book Upload
                                        </h3>
                                    </div>

                                    <FileUploader
                                        control={form.control}
                                        name="pdfFile"
                                        label="Book PDF File"
                                        acceptTypes={ACCEPTED_PDF_TYPES}
                                        icon={Upload}
                                        placeholder="Click to upload PDF"
                                        hint="PDF file (max 50MB)"
                                        disabled={isSubmitting} />
                                </div>

                                <div className="rounded-2xl border border-border bg-background p-6 space-y-5">
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            Book Details
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            Metadata used throughout the experience
                                        </p>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="h-11 bg-white border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-shadow"
                                                        placeholder="Thinking, Fast and Slow"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="author"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Author</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="h-11 bg-white border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-shadow"
                                                        placeholder="Daniel Kahneman"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>

                                <div className="rounded-2xl border border-border bg-background p-6">

                                    <div className="mb-5">
                                        <h3 className="font-semibold text-lg">
                                            Voice Assistant
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            Select a narration style
                                        </p>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="persona"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                                                <FormControl>
                                                    <VoiceSelector
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>


                            <div className="space-y-6 lg:sticky lg:top-8 h-fit">
                                <div className="rounded-2xl border border-border bg-background p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <ImageIcon className="h-5 w-5 text-primary" />
                                        <h3 className="font-semibold text-lg">
                                            Cover Image
                                        </h3>
                                    </div>

                                    <FileUploader
                                        control={form.control}
                                        name="coverImage"
                                        label="Cover image"
                                        acceptTypes={ACCEPTED_IMAGE_TYPES}
                                        icon={ImageIcon}
                                        placeholder="Upload cover image"
                                        hint="PNG • JPG • WEBP"
                                        disabled={isSubmitting}
                                    />

                                </div>

                                <div className="rounded-2xl  p-6">
                                    <Button type="submit" size="lg" className="w-full h-12 rounded-xl text-base font-semibold shadow-lg">
                                        Begin Synthesis
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground mt-3">
                                        Upload files and complete all fields before continuing.
                                    </p>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
};

export default UploadForm;