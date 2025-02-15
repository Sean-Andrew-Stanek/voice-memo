import SpeechRecorderDialog from '@/components/SpeechRecorderDialog';

const Home: React.FC = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center text-black">
            <div className="flex flex-col items-center p-2 bg-white border-2 border-black rounded-lg bg-opacity-90">
                <SpeechRecorderDialog />
            </div>
        </div>
    );
};

export default Home;
