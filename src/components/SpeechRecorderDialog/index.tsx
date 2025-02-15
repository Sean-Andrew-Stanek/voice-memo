'use client';

import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Textarea } from '../ui/textarea';

type InfoMessage = {
    message: string;
    level: 'info' | 'error';
};

const SpeechRecorderDialog: React.FC = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [info, setInfo] = useState<InfoMessage>({
        message: '',
        level: 'info'
    });

    const startListening = (): void => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Your browser does not support speech recognition.');
            return;
        }

        if (!recognitionRef.current) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onstart = (): void => setIsListening(true);
            recognition.onend = (): void => setIsListening(false);
            recognition.onresult = (event): void => {
                const latestTranscript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                setTranscript(latestTranscript);
            };
            recognitionRef.current = recognition;
        }

        recognitionRef.current.start();
    };

    const stopListening = (): void => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const copyToClipboard = (): void => {
        if (!transcript) {
            setInfo({ message: 'No transcript to copy.', level: 'error' });
            return;
        }

        navigator.clipboard
            .writeText(transcript)
            .then(() =>
                setInfo({
                    message: 'Transcript copied to clipboard!',
                    level: 'info'
                })
            )
            .catch(() =>
                setInfo({
                    message: 'Failed to copy transcript.',
                    level: 'error'
                })
            );
    };

    return (
        <Card className="w-full max-w-[600px] mx-auto p-4 shadow-lg">
            <CardHeader>
                <h2 className="text-xl font-bold">
                    🎙️ Speech-to-Text Recorder
                </h2>
                <p className="text-sm text-muted-foreground">
                    Status: {isListening ? '🟢 Listening...' : '🔴 Stopped'}
                </p>
            </CardHeader>
            <CardContent className="relative flex flex-col gap-4">
                <div className="flex gap-2">
                    <Button onClick={startListening} disabled={isListening}>
                        Start
                    </Button>
                    <Button
                        onClick={stopListening}
                        disabled={!isListening}
                        variant="destructive"
                    >
                        Stop
                    </Button>
                </div>
                <Textarea
                    className="min-h-[150px] text-lg"
                    readOnly
                    placeholder="🎤 Start speaking and your words will appear here..."
                    value={transcript}
                />
                <Button onClick={copyToClipboard} className="w-full">
                    Copy to Clipboard
                </Button>
                <div className="absolute bottom-0 flex items-center gap-2">
                    <p
                        className={`text-sm text-muted-foreground ${info.level === 'error' ? 'text-red-500' : 'text-green-500'}`}
                    >
                        {info.message}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
export default SpeechRecorderDialog;
