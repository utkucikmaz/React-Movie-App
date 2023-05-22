// import React, { useState } from "react";
// import { supabase } from "supabaseClient";

// type FavbuttonProps = {
//     onClick: () => void;
// };

// const Favbutton: React.FC<FavbuttonProps> = ({ onClick }) => {
//     const [isClicked, setIsClicked] = useState(false);

//     const onClickFavButton = () => {
//         setIsClicked(!isClicked);
//         onClick();
//     };

//     return (
//         <button
//             type="button"
//             id="FavTestId"
//             onClick={onClickFavButton}
//             data-cy="FavTest"
//             className={`fav-button ${isClicked ? "clicked" : ""}`}
//         >
//             <span className="fav-button-icon">&#9825;</span>
//         </button>
//     );
// };

// export default Favbutton;

import React, { useState, useEffect } from "react";
import { supabase } from "supabaseClient";

type FavbuttonProps = {
    onClick: () => void;
};

const Favbutton: React.FC<FavbuttonProps> = ({ onClick }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkFavoriteStatus();
    }, []);

    const checkFavoriteStatus = async () => {
        try {
            const { data: MovieFavorites, error } = await supabase
                .from("MovieFavorites")
                .select("favorite_button");

            if (error) {
                throw error;
            }

            // Assuming you only have one row for the movie in the MovieFavorites table
            if (MovieFavorites.length > 0) {
                const isFavorite = MovieFavorites[0].favorite_button;
                setIsFavorite(isFavorite);
                setIsClicked(isFavorite);
            }
        } catch (error) {
            console.error("Error fetching favorite status:", error);
        }
    };

    const onClickFavButton = async () => {
        try {
            setIsClicked(!isClicked);
            setIsFavorite(!isFavorite);

            // Update the favorite_button column in the MovieFavorites table
            await supabase
                .from("MovieFavorites")
                .update({ favorite_button: !isFavorite });

            onClick();
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    return (
        <button
            type="button"
            id="FavTestId"
            onClick={onClickFavButton}
            data-cy="FavTest"
            className={`fav-button ${isClicked ? "clicked" : ""}`}
        >
            <span
                className={`fav-button-icon ${isFavorite ? "filled-red" : ""}`}
            >
                &#9825;
            </span>
        </button>
    );
};

export default Favbutton;
