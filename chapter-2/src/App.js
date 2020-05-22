import React from "react";

const data = [
  {
    id: 1,
    name: "リオネル・メッシ",
    team: "FCバルセロナ",
    description:
      "現在はフリーランスとして活動中。TypeScript + Reactでの開発をメインにお仕事いただいてます。フロントエンドネタを中心に呟きます。GraphQL | Node.js | GatsbyJs | Next.js",
    isFollow: false,
  },
  {
    id: 2,
    name: "クリスティアーノ・ロナウド",
    team: "Juventus",
    description:
      "現在はフリーランスとして活動中。TypeScript + Reactでの開発をメインにお仕事いただいてます。フロントエンドネタを中心に呟きます。GraphQL | Node.js | GatsbyJs | Next.js",
    isFollow: true,
  },
  {
    id: 3,
    name: "ネイマール",
    team: "パリサンジェルマン",
    description:
      "現在はフリーランスとして活動中。TypeScript + Reactでの開発をメインにお仕事いただいてます。フロントエンドネタを中心に呟きます。GraphQL | Node.js | GatsbyJs | Next.js",
    isFollow: false,
  },
];

function App() {
  const [accounts, setAccounts] = React.useState(data);
  const onClickFollow = React.useCallback(
    (id) => {
      const updatedAccouns = accounts.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            isFollow: !e.isFollow,
          };
        } else {
          return e;
        }
      });
      setAccounts(updatedAccouns);
    },
    [accounts, setAccounts]
  );
  return (
    <ul class="accountList">
      {accounts.map((e) => {
        return (
          <li key={e.id} class="accountList__item">
            <div>
              <div class="account__summary">
                <div>
                  <p class="account__name">{e.name}</p>
                  <p class="account__team">{e.team}</p>
                </div>
                <div>
                  <button
                    type="button"
                    class={`followBtn ${e.isFollow ? "isFollow" : ""}`}
                    onClick={() => onClickFollow(e.id)}
                  >
                    {e.isFollow ? "フォロー中" : "フォローする"}
                  </button>
                </div>
              </div>
              <p class="account__description">{e.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default App;
