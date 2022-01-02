import React from "react";

const data = [
  {
    id: 1,
    name: "リオネル・メッシ",
    team: "FCバルセロナ",
    description:
      "アルゼンチンサンタフェ州ロサリオ出身のイタリア系アルゼンチン人サッカー選手。リーガ・エスパニョーラ・FCバルセロナ所属。アルゼンチン代表。ポジションはフォワード (wikipedia)",
    isFollow: false,
  },
  {
    id: 2,
    name: "クリスティアーノ・ロナウド",
    team: "Juventus",
    description:
      "ポルトガル・フンシャル出身のサッカー選手。セリエA・ユヴェントスFC所属。ポルトガル代表。ポジションはフォワード (wikipedia)",
    isFollow: true,
  },
  {
    id: 3,
    name: "ネイマール",
    team: "パリサンジェルマン",
    description:
      "ブラジル・サンパウロ州モジ・ダス・クルーゼス出身のサッカー選手。ブラジル代表。リーグ・アン・パリ・サンジェルマンFC所属。ポジションはフォワード (wikipedia)",
    isFollow: false,
  },
];

function App() {
  const [accounts, setAccounts] = React.useState(data);
  // ボタン押下後のフォローとフォロー解除の実装
  const onClickFollow = React.useCallback(  // ボタン押下時に実行される関数
    (id) => {                       // id: ボタンが押されたアカウントのid
      const updatedAccounts = accounts.map((e) => {   // フォローしたアカウントのみを更新 (isFollow: true)  // フォロー解除したアカウントのみを更新 (isFollow: false) // アカウントのidが一致した場合にisFollowを反転させる
        if (e.id === id) {          // idが一致した場合 (e.id === id)
          return {
            ...e,
            isFollow: !e.isFollow,  // isFollowを反転させる
          };                        // ...e: eの中身を全てコピーして新しいオブジェクトを作成
        } else {                    // idが一致しなかった場合
          return e;                 // eをそのまま返す
        }
      });
      setAccounts(updatedAccounts); // 更新したアカウントをセット
    },                              // ボタン押下時に実行される関数
    [accounts, setAccounts]         // 引数にaccountsとsetAccountsを渡す
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
