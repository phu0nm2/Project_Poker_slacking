import React, {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import "./index.css";
import Controls from "../../components/Control";
import Main from "../../components/Main";
import axios from "axios";
import { useDispatch } from "react-redux";

const Game = () => {
  //useEffect đại diện cho Lifecycle
  const [count, setCount] = useState(0);

  // DidMount (chạy 1 lần đầu tiên), DidUpdate (chạy khi có thay đổi), willUnMount

  // useEffect(() => {
  //   console.log("run anytime");
  // });

  const dispatch = useDispatch();

  const fetchNewDeck = useCallback(() => {
    // call api
    axios({
      method: "GET",
      url: "https://deckofcardsapi.com/api/deck/new/",
    })
      .then((res) => {
        dispatch({ type: "SET_DECK_CARD", payload: res.data });
        localStorage.setItem("deck_id", res.data.deck_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const shuffleDeck = useCallback(
    (id) => {
      axios({
        method: "GET",
        url: `https://deckofcardsapi.com/api/deck/${id}/shuffle/`,
      })
        .then((res) => {
          dispatch({ type: "SET_DECK_CARD", payload: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  const total = useMemo(() => {
    return 1000 * 60000000 + 2000 * 122 + 123 * 132 + count;
  }, [count]);

  // didMount: Mảng dependencies rỗng, chạy 1 lần
  useEffect(() => {
    // console.log("run DidMount");
    // call api
    const deckId = localStorage.getItem("deckId");

    if (deckId) shuffleDeck(deckId);
    else fetchNewDeck();
  }, []); // Mảng dependencies

  // DidUpdate: Mảng dependencies có giá trị, chạy khi biến count có thay đổi
  // useEffect(() => {
  //   console.log("run DidUpdate");
  // }, [count]);

  return (
    <Fragment>
      <button onClick={() => setCount(count + 1)}>Set Count</button>
      <Controls fetchNewDeck={fetchNewDeck} />
      <Main />
    </Fragment>
  );
};
export default Game;
