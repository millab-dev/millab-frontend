import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AchievementSection = () => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-4">
            <h2 className="text-base md:text-lg font-semibold mb-4">Achievements</h2>
            <Card className="bg-gray-50 border border-gray-200">
                <CardContent className="flex items-center justify-center p-12">
                    <p className="text-gray-500 text-center text-sm md:text-base font-medium">On Development</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AchievementSection;