import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from 'framer-motion';

type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
};

const Leaderboard = () => {
  // Reference for the entire card container
  const cardRef = React.useRef(null);
  // Animation triggers when just 5% of the card is visible
  const isCardInView = useInView(cardRef, { once: true, amount: 0.05 });
  // Mock data for the leaderboard - more than 20 entries but we'll display only top 10
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: 'John Doe', score: 3000 },
    { rank: 2, name: 'Muhammad Raflianwar Aziz Dhuhaprasetyo Lengkap Bangettttttt', score: 2000 },
    { rank: 3, name: 'John Doe', score: 1000 },
    { rank: 4, name: 'Sarah Williams', score: 950 },
    { rank: 5, name: 'Alex Johnson', score: 800 },
    { rank: 6, name: 'Emma Thompson', score: 750 },
    { rank: 7, name: 'Michael Brown', score: 700 },
    { rank: 8, name: 'Olivia Davis', score: 650 },
    { rank: 9, name: 'William Wilson', score: 600 },
    { rank: 10, name: 'Sophia Martin', score: 550 },
    { rank: 11, name: 'James Anderson', score: 500 },
    { rank: 12, name: 'Charlotte Taylor', score: 480 },
    { rank: 13, name: 'Benjamin Moore', score: 460 },
    { rank: 14, name: 'Amelia Jackson', score: 440 },
    { rank: 15, name: 'Lucas White', score: 420 },
    { rank: 16, name: 'Mia Harris', score: 400 },
    { rank: 17, name: 'Henry Clark', score: 380 },
    { rank: 18, name: 'Ava Lewis', score: 360 },
    { rank: 19, name: 'Sebastian Lee', score: 340 },
    { rank: 20, name: 'Isabella Walker', score: 320 },
  ];
  
  // We only display the top 10
  const displayedLeaderboard = leaderboardData.slice(0, 10);

  // Current user data (at position 401)
  const currentUser: LeaderboardEntry = {
    rank: 401,
    name: 'You',
    score: 50,
    isCurrentUser: true
  };

  // Render a leaderboard row
  const renderRow = (entry: LeaderboardEntry) => {
    // Determine if this is a top 3 rank that needs a medal image
    const getMedalImage = () => {
      switch (entry.rank) {
        case 1:
          return <img src="/first-place.png" alt="1st" className="h-8 w-8" />;
        case 2:
          return <img src="/second-place.png" alt="2nd" className="h-8 w-8" />;
        case 3:
          return <img src="/third-place.png" alt="3rd" className="h-8 w-8" />;
        default:
          return <span className="text-gray-600 text-base font-medium w-8 text-center">{entry.rank}</span>;
      }
    };

    return (
      <div 
        key={entry.rank} 
        className={`flex items-center py-2 px-4 ${entry.isCurrentUser ? 'bg-[#FFCF89] rounded-md' : ''}`}
      >
        <div className="flex items-center justify-center w-8 mr-1">
          {getMedalImage()}
        </div>
        <div className="flex items-center flex-grow min-w-0 pr-1" style={{width: "calc(100% - 90px)"}}>
          <img 
            src="/rabbit-leaderboard.png" 
            alt="User" 
            className="h-12 w-12 mr-2 flex-shrink-0" 
          />
          <span className="text-sm md:text-base font-medium truncate">{entry.name}</span>
        </div>
        <div className="text-sm md:text-base text-gray-600 font-medium flex-shrink-0 w-[60px] text-right">
          {entry.score} xp
        </div>
      </div>
    );
  };

  return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
      <Card className="p-0 overflow-hidden border border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col items-center mb-6">
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Leaderboard
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-[#EF5BA1] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              3 days to go
            </motion.p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {/* Leaderboard rows */}
            <div className="space-y-2">
              {displayedLeaderboard.map((entry, index) => {
                const RowAnimated = () => {
                  const rowRef = React.useRef(null);
                  const isRowInView = useInView(rowRef, { once: true, amount: 0.5 });
                  
                  return (
                    <motion.div
                      ref={rowRef}
                      key={entry.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isRowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderRow(entry)}
                    </motion.div>
                  );
                };
                
                return <RowAnimated key={entry.rank} />;
              })}
              
              {/* Gap indicator if user is outside top 10 */}
              {currentUser.rank > 10 && (
                <div className="py-2 px-4 text-center text-gray-400 text-sm font-bold">
                  <motion.div 
                    className="text-center py-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="text-gray-400 leading-[0.6]">
                      •<br/>•<br/>•
                    </div>
                  </motion.div>
                </div>
              )}
              
              {/* Current user row */}
              {(() => {
                const CurrentUserRowAnimated = () => {
                  const currentUserRef = React.useRef(null);
                  const isCurrentUserInView = useInView(currentUserRef, { once: true, amount: 0.5 });
                  
                  return (
                    <motion.div
                      ref={currentUserRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isCurrentUserInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                    >
                      {renderRow(currentUser)}
                    </motion.div>
                  );
                };
                
                return <CurrentUserRowAnimated />;
              })()}
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    );
};

export default Leaderboard;