import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from 'framer-motion';
import { ProfileComponentProps, leaderboardTranslations } from './types';

type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
  userId: string;
};

const Leaderboard: React.FC<ProfileComponentProps> = ({ language = 'id' }) => {
  // Get translations based on language
  const t = leaderboardTranslations[language];

  // Reference for the entire card container
  const cardRef = React.useRef(null);
  // Animation triggers when just 5% of the card is visible
  const isCardInView = useInView(cardRef, { once: true, amount: 0.01 });
  
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);  const fetchLeaderboardData = async () => {
    try {
      // Fetch leaderboard data
      const leaderboardResponse = await fetch(
        `/api/v1/progression/leaderboard?limit=10`,
        { credentials: "include" }
      );

      // Fetch current user progression
      const userProgressionResponse = await fetch(
        `/api/v1/progression/me`,
        { credentials: "include" }
      );

      if (leaderboardResponse.ok && userProgressionResponse.ok) {
        const leaderboardResult = await leaderboardResponse.json();
        const userProgressionResult = await userProgressionResponse.json();

        if (leaderboardResult.success && userProgressionResult.success) {          // Transform leaderboard data
          const transformedLeaderboard = leaderboardResult.data.map((entry: any, index: number) => ({
            rank: index + 1,
            name: entry.name || `No Username`,
            score: entry.score,
            userId: entry.userId,
            isCurrentUser: false
          }));

          setLeaderboardData(transformedLeaderboard);

          // Set current user data
          const userProgression = userProgressionResult.data;
          setCurrentUser({
            rank: userProgression.rank || 999,
            name: t.youLabel,
            score: userProgression.points || 0,
            isCurrentUser: true,
            userId: 'current'
          });
        }      } else {
        console.log('Leaderboard API failed or returned no data');
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
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
        key={`${entry.userId}-${entry.rank}`}
        className={`flex items-center py-2 px-4 ${entry.isCurrentUser ? 'bg-[#FFCF89] rounded-md' : ''}`}
      >
        <div className="flex items-center justify-center w-8 mr-1">
          {getMedalImage()}
        </div>
        <div className="flex items-center flex-grow min-w-0 pr-1" style={{ width: "calc(100% - 90px)" }}>
          <img
            src="/rabbit-leaderboard.png"
            alt="User"
            className="h-12 w-12 mr-2 flex-shrink-0"
          />
          <span className="text-sm md:text-base font-medium truncate">{entry.name}</span>
        </div>
        <div className="text-sm md:text-base text-gray-600 font-medium flex-shrink-0 w-[60px] text-right">
          {entry.score} {t.pointsLabel}
        </div>
      </div>
    );
  };

  if (loading) {
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
              <h2 className="text-2xl md:text-3xl font-semibold text-primary">
                {t.title}
              </h2>
            </div>
            <div className="space-y-4">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="animate-pulse flex items-center py-2 px-4">
                  <div className="w-8 h-8 bg-gray-200 rounded mr-1"></div>
                  <div className="flex items-center flex-grow">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded flex-grow"></div>
                  </div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

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
              {t.title}
            </motion.h2>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Leaderboard rows */}
            <div className="space-y-2">
              {leaderboardData.map((entry, index) => {
                const RowAnimated = () => {
                  const rowRef = React.useRef(null);
                  const isRowInView = useInView(rowRef, { once: true, amount: 0.5 });

                  return (
                    <motion.div
                      ref={rowRef}
                      key={`${entry.userId}-${entry.rank}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isRowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderRow(entry)}
                    </motion.div>
                  );
                };

                return <RowAnimated key={`${entry.userId}-${entry.rank}`} />;
              })}

              {/* Gap indicator if user is outside top 10 */}
              {currentUser && currentUser.rank > 10 && (
                <div className="py-2 px-4 text-center text-gray-400 text-sm font-bold">
                  <motion.div
                    className="text-center py-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="text-gray-400 leading-[0.6]">
                      {t.gapIndicator}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Current user row */}
              {currentUser && (() => {
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