import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//  useSelector dùng để connect
const Control = () => {
  const players = useSelector((state) => {
    return state.player.playerList;
  });

  const deckCard = useSelector((state) => {
    return state.card.deckCard;
  });

  // dispatch action len store
  const dispatch = useDispatch();

  const fetchCards = useCallback(async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://deckofcardsapi.com/api/deck/${deckCard.deck_id}/draw/?count=12`,
      });

      // res.data.cards là mảng 12 lá
      console.log(res.data.cards);

      // chia 12 lá bài cho 4 player
      const playerList = [...players];

      for (let i in res.data.cards) {
        const playerIndex = i % playerList.length;
        playerList[playerIndex].cards.push(res.data.cards[i]);
      }
      // dispatch action nguyên playerList mới lên reducers
      dispatch({ type: "SET_PLAYERS", payload: playerList });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, deckCard, players]);

  // Reveal: Lật bài và tính điểm
  const handleReveal = useCallback(() => {
    // dispatch action lật bài
    dispatch({ type: "SET_REVEAL", payload: true });
  }, [dispatch]);

  //================================================================
  const checkResult = useCallback(() => {
    const playerList = [...players];

    const winners = [];

    // check special Cases (KING, JACK, QUEEN)

    // nếu ko có special cases, covert rồi cộng điểm từng player rồi tìm max

    // update điểm cho người thắng

    // dispatch lên store cập nhật playerList
  }, []);

  //nhận vào mảng cards của players ,check bằng value, nếu
  //cả 3 lá đều là KING JACK QUEEN thì là trường hợp đặt biệt
  const checkSpecialCases = (cards) => {};
  // nhận vào value của card => number
  // number => number
  // KING JACK QUEEN => 10
  // ACE => 1

  const convertCardValue = (val) => {};

  return (
    <div className="d-flex  justify-content-end container">
      <div className="border d-flex justify-content-center align-items-center px-2">
        <button className="btn btn-success mr-2">Shuffle</button>
        <button onClick={fetchCards} className="btn btn-info mr-2">
          Draw
        </button>
        <button onClick={handleReveal} className="btn btn-primary mr-2">
          Reveal
        </button>
      </div>
      <div className="d-flex">
        {players.map((player) => {
          return (
            <div key={player.username} className="border px-3 text-center">
              <p>{player.username}</p>
              <p>{player.totalPoint}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Control;
