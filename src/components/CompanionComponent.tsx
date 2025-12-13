import { getSubjectColor, cn } from "../lib/utils"
import { useState, useEffect, useRef } from "react"
import { vapi } from "../lib/vapi.sdk.ts"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import soundwaves from "../../constants/soundwaves.json"
import { configureAssistant } from "../lib/utils"
import type { CompanionComponentProps, SavedMessage } from "types/index"
import type { AssistantOverrides } from "@vapi-ai/web/dist/api"
import { addToSessionHistory } from "@/lib/actions/companion.actions.ts"
import { useAuth } from "@clerk/clerk-react"

type CallStatus = "INACTIVE" | "CONNECTING" | "ACTIVE" | "FINISHED";

type Message = {
  type: string;
  transcriptType?: string;
  role: "assistant" | "user";
  transcript?: string;
};

const CompanionComponent = ({
    companionId,
    subject,
    topic,
    name,
    userName,
    userImage,
    voice,
    style,
    userId
    }: CompanionComponentProps) => {

    const [callStatus, setCallStatus] = useState<CallStatus>("INACTIVE")
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [messages, setMessages] = useState<SavedMessage[]>([])
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    const { getToken } = useAuth();

    // console.log(companionId)
    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    // console.log(companion)
    

    useEffect(() => {
        const onCallStart = () => setCallStatus("ACTIVE");
        const onCallEnd = async () => {
            setCallStatus("FINISHED");

            try {
            // companionId comes from props
            // userId you can get from your auth context or Clerk
                const token = await getToken({ template: "default" });

                if (!token) {
                    return
                } else {
                    
                    await addToSessionHistory(companionId, token);
                    console.log("Session history saved");
                }
            } catch (err) {
                console.error("Failed to save session history", err);
            }
        }
       
        const onMessage = (message: Message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                const newMessage: SavedMessage = {
                    role: message.role as "assistant" | "user",
                    content: message.transcript ?? ""
                };
                setMessages(prev => [newMessage, ...prev]);

            }
        };

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (error: Error) => console.log("Error", error);
        
        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.removeListener('call-start', onCallStart);
            vapi.removeListener('call-end', onCallEnd);
            vapi.removeListener('message', onMessage);
            vapi.removeListener('error', onError);
            vapi.removeListener('speech-start', onSpeechStart);
            vapi.removeListener('speech-end', onSpeechEnd);
        }
    }, [])

    const toggleMicrophone = () => {
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    };

    const handleCall = async () => {
        setCallStatus("CONNECTING")

        const assistantOverrides: AssistantOverrides = {
            variableValues: {
                subject, topic, style
            },
            clientMessages: ['transcript'],
            serverMessages: undefined,
        }

        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = async () => {
        setCallStatus("FINISHED")
        vapi.stop()
    }
    

    return (
        <section className="flex flex-col h-[70vh]">
            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section">
                    <div 
                        className="companion-avatar"
                        style={{
                            backgroundColor: getSubjectColor(subject)
                        }}
                    >
                        <div 
                            className={cn(
                                "absolute transition-opacity duration-1000",
                                callStatus === "FINISHED" || callStatus === "INACTIVE" ? 'opacity-100' : 'opacity-0',
                                callStatus === "CONNECTING" && 'opacity-100 animate-pulse'
                            )}
                        >
                            <img
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={150}
                                height={150}
                                className="max-sm:w-fit"
                            />
                        </div>

                        <div className={cn(
                            "absolute transition-opacity duration-1000",
                            callStatus === "ACTIVE" ? 'opacity-100' : 'opacity-0'
                        )}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoPlay={false}
                                className="companion-lottie"
                            />
                        </div>
                    </div>

                    <p className="font-bold text-2xl">{name}</p>
                </div>

                <div className="user-section">
                    <div className="user-avatar">
                        <img
                            src={userImage}
                            alt={name}
                            width={130}
                            height={130}
                            className="rounded-lg"
                        />

                        <p className="font-bold text-2xl">{userName}</p>
                    </div>

                    <button 
                        className="btn-mic"
                        onClick={toggleMicrophone}
                        disabled={callStatus !== "ACTIVE"}
                    >
                        <img
                            src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                            alt="mic"
                            width={36}
                            height={36}
                        />

                        <p className="max-sm:hidden ">{isMuted ? "Turn on microphone" : "Turn off microphone"}</p>
                    </button>

                    <button 
                        className={cn(
                            "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
                            callStatus === "ACTIVE" ? "bg-red-700" : "bg-primary",
                            callStatus === "CONNECTING" && "animate-pulse",
                        )}
                        onClick={callStatus === "ACTIVE" ? handleDisconnect : handleCall}
                    >
                        {callStatus === "ACTIVE" ? "End Session" : callStatus === "CONNECTING" ? "Connecting" : "Start Session"}
                    </button>
                </div>
            </section>

            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if (message.role === "assistant") {
                            return (
                                <p
                                    key={index}
                                    className="max-sm:text-sm"
                                >
                                    {
                                        name
                                            .split(" ")[0]
                                            .replace(/\W/g, "")
                                    } : {message.content}
                                </p>
                            )
                        } else {
                            return (
                                <p
                                    key={index}
                                    className="text-primary max-sm:text-sm"
                                >
                                    {userName}: {message.content}
                                </p>
                            )
                        }
                    })}
                </div>

                <div className="transcript-fade"/>
            </section>
        </section>
    )
}

export default CompanionComponent