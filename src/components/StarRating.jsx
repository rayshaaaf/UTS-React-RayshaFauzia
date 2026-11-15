import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, onRatingChange, interactive = false, size = 20 }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isFilled = (hoverRating || rating) >= starValue;

        if (interactive) {
          return (
            <button
              type="button"
              key={starValue}
              onClick={() => onRatingChange && onRatingChange(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
              title={`${starValue} Bintang`}
            >
              <Star
                size={size}
                strokeWidth={1.5}
                className={`transition-colors duration-150 ${
                  isFilled
                    ? 'text-[#EE4B82] fill-[#FF6B9E]'
                    : 'text-[#FFB8D2] fill-transparent hover:text-[#EE4B82]'
                }`}
              />
            </button>
          );
        }

        return (
          <Star
            key={starValue}
            size={size}
            strokeWidth={1.5}
            className={`${isFilled ? 'text-[#EE4B82] fill-[#FF6B9E]' : 'text-[#FFD4E5] fill-transparent'}`}
          />
        );
      })}
    </div>
  );
}
