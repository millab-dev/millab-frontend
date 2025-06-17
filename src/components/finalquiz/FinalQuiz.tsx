import { Gamepad2 } from "lucide-react";
import beginnerIcon from "@/assets/beginnerIcon.svg";
import intermediateIcon from "@/assets/intermediateIcon.svg";
import advancedIcon from "@/assets/advancedIcon.svg";
import Image from "next/image";
import star from "@/assets/star.svg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserScore } from "@/actions/userScore.get-score";
import Link from "next/link";

export default function FinalQuiz({ userScore } : { userScore: UserScore }) {
    return (
        <div className="min-h-screen p-4 font-jakarta py-12 ">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-bold text-center text-primary mb-8">
                    Ready to Play?
                </h1>

                {/* Score Section */}
                <div className="bg-gradient-to-r from-primary to-blue-400 rounded-2xl p-8 mb-6 text-white relative overflow-hidden">
                    {/* Decorative stars/elements */}
                    <div className="absolute top-4 right-8 opacity-20">
                        <Image src={star} alt="star" className="w-30 h-30" />
                    </div>

                    <div className="relative z-10">
                        <p className="text-lg mb-2 opacity-90">
                            You&apos;ve scored...
                        </p>
                        <h2 className="text-5xl font-bold mb-3">{userScore.score} points</h2>
                        <p className="text-lg opacity-90 mb-6">
                            Can you beat your own record?
                        </p>

                        {/* How to Play Button with Modal */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors 
                                duration-200 flex items-center gap-2 w-full justify-center text-lg cursor-pointer">
                                    <Gamepad2 className="w-6 h-6" />
                                    How to Play?
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md w-full rounded-2xl p-8 font-jakarta">
                                <DialogHeader>
                                    <DialogTitle className="text-3xl font-bold text-center mb-6">How to Play?</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 mb-6">
                                    {["Take the quiz and answer each question.",
                                      "See your results instantly after finishing.",
                                      "Your results will be added as points to your profile.",
                                      "Check your rank on the leaderboard and challenge friends!"].map((step, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-primary font-bold text-lg">
                                                {idx + 1}
                                            </div>
                                            <div className="text-base font-medium text-gray-800 flex-1">
                                                {step}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <DialogClose asChild>
                                    <Button className="w-full mt-2" variant="default">Understand!</Button>
                                </DialogClose>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Difficulty Levels */}
                <div className="space-y-4">
                    {/* Beginner */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                <Link href="/final-quiz/beginner">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Image src={beginnerIcon} alt="beginner" className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-1">
                                        Beginner
                                    </h3>
                                    <p className="text-gray-600">
                                        Perfect for newcomers! Start with basic questions and build your confidence.
                                    </p>
                                </div>
                            </div>
                            <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </Link>
                    </div>

                    {/* Intermediate */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                        <Link href="/final-quiz/intermediate">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Image src={intermediateIcon} alt="intermediate" className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-1">
                                        Intermediate
                                    </h3>
                                    <p className="text-gray-600">
                                        Ready for a challenge? Test your knowledge with more complex questions and scenarios.
                                    </p>
                                </div>
                            </div>
                            <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Advanced */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                        <Link href="/final-quiz/advanced">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Image src={advancedIcon} alt="advanced" className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-1">
                                        Advanced
                                    </h3>
                                    <p className="text-gray-600">
                                        Ready for the ultimate test? Push your knowledge to the limit with the most challenging questions.
                                    </p>
                                </div>
                            </div>
                            <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
