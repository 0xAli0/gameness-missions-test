import React from 'react';

interface ReferralProgressBarProps {
  totalReferrals: number;
}

const ProgressBar: React.FC<ReferralProgressBarProps> = ({ totalReferrals }) => {
  const progress = Math.min((totalReferrals / 50) * 100, 100);

  return (
    <div className="px-2 w-full">
        <div className="flex gap-2 items-center w-full text-[9px] md:text-sm sm:text-xs py-3 pr-11 md:pr-14 relative">
        <div className=" flex flex-col justify-between h-full items-center absolute left-1/4">
            <span className="text-gray-100 w-24 md:w-28 font-red_hot_display font-light text-center">
            1.25X MULTIPLIER
            </span>
            <div className="bg-white flex w-3 justify-start h-3"></div>
            <span className="text-gray-100 w-24 md:w-28 font-red_hot_display font-light text-center">
            10 REFERRALS
            </span>
        </div>
        <div className=" flex flex-col justify-between h-full items-center absolute left-1/2">
            <span className="text-gray-100 w-24 md:w-28 font-red_hot_display font-light text-center">
            1.5X MULTIPLIER
            </span>
            <div className="bg-white flex w-3 justify-start h-3"></div>
            <span className="text-gray-100 w-24 md:w-28 font-red_hot_display font-light text-center">
            25 REFERRALS
            </span>
        </div>
        <div className=" flex flex-col justify-between h-full items-center absolute right-0">
            <span className="text-gray-100 w-24 md:w-28 font-red_hot_display font-light text-center">
            2X MULTIPLIER
            </span>
            <div className="bg-white flex w-3 justify-start h-3"></div>
            <span className="text-gray-100 w-24 md:w-28 font-red_hot_display font-light text-center">
            50 REFERRALS
            </span>
        </div>
        <span className="text-gray-100 w-20 font-red_hot_display font-light text-center">
            REFERRAL MULTIPLIER
        </span>
        <div className="bg-black flex w-full justify-start h-3">
            <div className="bg-gradient-to-l from-primary from-30% via-red-800 via-100% flex w-full justify-end h-3" style={{ width: `${progress}%` }}></div>
        </div>
        </div>
    </div>
  );
};

export default ProgressBar;