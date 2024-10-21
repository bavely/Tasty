import "./utils/css/App.css";
import "./utils/css/recipe.css";
import Recipe from "./components/Recipe";
import { getRecipes, getNextPage } from "./services/APICalls";
import { useState } from "react";
import { RecipeType, HitType, NextType } from "./utils/Interfaces/Interface";
import { MouseEvent, ChangeEvent } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "animate.css";
import gif from "./utils/imgs/vsgif_com__.2517947.gif";
import { IoIosSearch } from "react-icons/io";
function App() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [next, setNext] = useState<NextType>({
    href: "",
    title: "",
  });
  const [count, setCount] = useState<number>(0);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setRecipes([]);
    setMsg("");
    setCount(0);
    setLoading(true);
    if (userInput === "") {
      setMsg("Please type something!");
      setLoading(false);
      return;
    }
    setMsg("");
    getRecipes(userInput)
      .then((res) => {
        if (res?.data?.count && res.data.count > 0) {
          setMsg(`${res.data.count} results found`);
          setCount(res.data.count);
        } else {
          setMsg("No Results");
        }
        res?.data?._links?.next && setNext(res.data._links.next);
        setRecipes(res.data.hits.map((hit: HitType) => hit.recipe));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMsg(err.response.data.message);
        setLoading(false);
        setRecipes([]);
        setCount(0);
      });
  };

  const handleNext = () => {
    setTimeout(() => {
      setLoading(true);
      getNextPage(next.href)
        .then((res) => {
          res?.data?.count && res.data.count > 0
            ? setMsg(`${res.data.count} results found`)
            : setMsg("No Results");
          res?.data?._links?.next && setNext(res.data._links.next);
          setRecipes([
            ...recipes,
            ...res.data.hits.map((hit: HitType) => hit.recipe),
          ]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setMsg(err.response.data.message);
          setRecipes([]);
          setLoading(false);
          setCount(0);
        });
    }, 1500);
  };
  return (
    <div className="app-container">
      <div className="header">
        <div className="title-container">
          <h1>Tasty</h1>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for recipes"
            value={userInput}
            onChange={handleChange}
          />
          <button onClick={handleSearch} className="search-button">
            {/* <span><SearchSharpIcon /></span> */}
            <IoIosSearch  size={30}  />
          </button>
        </div>

        <div className="message-container">
          <p>{msg}</p>
        </div>
      </div>
      <div>
        
        <InfiniteScroll
          className="recipes-container"
          pageStart={0}
          loadMore={handleNext}
          hasMore={recipes.length < count}
          loader={
            <div className="loader recipes-container" key={0}>
              <div className="recipe-card">
                <Stack spacing={1} sx={{ paddingTop: "1rem" }}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="rectangular" width={"100%"} height={200} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </Stack>
              </div>
              <div className="recipe-card">
                <Stack spacing={1} sx={{ paddingTop: "1rem" }}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="rectangular" width={"100%"} height={200} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </Stack>
              </div>
              <div className="recipe-card">
                <Stack spacing={1} sx={{ paddingTop: "1rem" }}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="rectangular" width={"100%"} height={200} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </Stack>
              </div>
              <div className="recipe-card">
                <Stack spacing={1} sx={{ paddingTop: "1rem" }}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="rectangular" width={"100%"} height={200} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </Stack>
              </div>
            </div>
          }>
          {loading && <img src={gif} alt="loader" />}
          {recipes
            .sort((a, b) => b.calories - a.calories)
            .map((recipe: RecipeType, index) => (
             <Recipe key={index} recipe={recipe} />
            ))}
        </InfiniteScroll>

      </div>
      <div className="footer row">
        <div
          className="text-center pt-3 pb-3"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "fixed",
            bottom: 0,
            width: "100%",
          }}>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: "bold",
              color: "white",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}>
            © 2023 Bavely Tawfik
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
