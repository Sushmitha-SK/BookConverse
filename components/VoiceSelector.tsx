'use client';

import {
    RadioGroup,
    RadioGroupItem,
} from '@/components/ui/radio-group';

import { Label } from '@/components/ui/label';
import { voiceCategories, voiceOptions } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { VoiceSelectorProps } from '@/types';
import {
    Volume2,
    CheckCircle2
} from 'lucide-react';

const VoiceSelector = ({
    value,
    onChange,
    disabled,
    className,
}: VoiceSelectorProps) => {

    const renderCategory = (
        title: string,
        voices: string[]
    ) => (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    {title}
                </h4>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {voices.map((voiceId) => {

                    const voice =
                        voiceOptions[
                        voiceId as keyof typeof voiceOptions
                        ];

                    const selected =
                        value === voiceId;

                    return (
                        <Label
                            key={voiceId}
                            htmlFor={voiceId}
                            className={cn(
                                `relative cursor-pointer rounded-2xl border border-border p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1`,
                                selected
                                    ? `border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20`
                                    : `bg-background hover:border-primary/40`,
                                disabled &&
                                'opacity-50 pointer-events-none'
                            )}
                        >
                            <RadioGroupItem value={voiceId} id={voiceId} className="sr-only" />
                            {selected && (
                                <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-primary" />
                            )}

                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Volume2 className="h-5 w-5 text-primary" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">
                                            {voice.name}
                                        </h3>
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                        {voice.description}
                                    </p>
                                </div>
                            </div>
                        </Label>
                    );
                })}
            </div>
        </div>
    );

    return (

        <div className={cn('space-y-8', className)}>
            <RadioGroup value={value} onValueChange={onChange} disabled={disabled} className="space-y-8">
                {renderCategory(
                    'Male Voices',
                    voiceCategories.male
                )}

                {renderCategory(
                    'Female Voices',
                    voiceCategories.female
                )}
            </RadioGroup>
        </div>
    );
};

export default VoiceSelector;


