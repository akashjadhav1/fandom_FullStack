import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import heartOutline from "@/assets/heart.svg";
import filledHeart from "@/assets/heartFill.svg";
import { renderStars } from "@/assets/renderStar";
import { Button } from "../ui/button";
import PaginationComponent from "../Pagination";
import useFavorites from "@/hooks/useFavorites"; // Adjust the path according to your project structure
import { useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function CardData({ trendingData, filter, searchQuery }) {
  const { favorites, toggleFavorite } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  // Sort and filter the data
  const sortedData = trendingData.data
    .slice() // Create a copy to avoid mutating the original data
    .sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB - dateA; // Sort in descending order
    });

  const filteredData = searchQuery
    ? sortedData.filter((item) =>
        (item.title || item.name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : filter === "all"
    ? sortedData
    : sortedData.filter((item) => item.media_type === filter);

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Slice the data for the current page
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="lg:container mx-auto mt-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {paginatedData.map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer hover:shadow-xl transition-shadow duration-300 border-none bg-black shadow-white shadow-md rounded"
          >
            <CardHeader className="relative flex flex-col items-center justify-center lg:h-[210px] h-[150px]">
              <div className="object-contain h-full">
                <Link to={`/mediaOverview/${item.id}`}>
                  <img
                    src={`${IMAGE_BASE_URL}${
                      item.poster_path || item.backdrop_path
                    }`}
                    alt={item.title || item.name}
                    className="object-contain w-full h-full rounded"
                  />
                </Link>
              </div>
              <img
                src={
                  favorites.includes(item.id.toString())
                    ? filledHeart
                    : heartOutline
                }
                alt="heart"
                className="absolute top-2 right-2 lg:w-7 md:w-6 w-5 cursor-pointer"
                onClick={() => toggleFavorite(item.id, navigate)}
              />
            </CardHeader>
            <hr />
            <CardContent>
              <CardTitle className="lg:text-md lg:font-bold mt-2 lg:text-center text-sm truncate">
                {item.title || item.name}
              </CardTitle>
              <div className="flex justify-between pt-2">
                <p className="lg:font-bold text-[10px] lg:text-md mt-0.5">
                  Rating:
                </p>
                <p className="flex lg:w-auto w-14">
                  {renderStars(item.vote_average)}
                </p>
              </div>
              <div className="lg:flex lg:justify-between lg:items-center md:flex md:justify-between md:items-center mt-3">
                <Button
                  size="sm"
                  className="shadow-orange-500 shadow-sm lg:w-auto w-full h-8 lg:mt-0 mt-3"
                >
                  {item.media_type ? item.media_type.toUpperCase() : "N/A"}
                </Button>
                <Link to={`/mediaOverview/${item.id}`}>
                  <Button
                    size="sm"
                    className="shadow-green-500 shadow-sm lg:w-auto w-full h-8 lg:mt-0 mt-3"
                  >
                    Watch Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 mb-8">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default CardData;
