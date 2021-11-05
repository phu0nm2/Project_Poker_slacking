import React from "react";
import Card from "../Card";

const Player = (props) => {
  return (
    <div className={`player-${props.index}`}>
      <p className="lead">{props.player.username}</p>
      <main className="d-flex">
        {props.player.cards.map((item) => {
          return <Card card={item} key={item.code} />;
        })}
      </main>
    </div>
  );
};

export default Player;
