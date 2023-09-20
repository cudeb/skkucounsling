import { observer } from "mobx-react-lite";
import { mainStore } from "../../dataflow/store";

const MainPage = observer(() => {
    const store = mainStore;
  return (
    <div>
        {
            store.getFlag() ?
            <div>
                <h1>Flag On</h1>
                <button onClick={() => store.setFlag(false)}>로그아웃</button>
            </div>
            :
            <div>
                <h1>Flag off</h1>
                <button onClick={() => store.setFlag(true)}>로그인</button>
            </div>
        }
      <h1>메인페이지</h1>
    </div>
  );
});

export default MainPage;
