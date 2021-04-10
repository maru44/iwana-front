import { NextPage } from 'next';

interface ModalParams {
  open: boolean,
  closeFunc: any,
  logoutFunc: any,
}

// delete wanted component
const DelWantedComponent: NextPage<ModalParams> = (props) => {

    let parentOpen = props.open;

    if (parentOpen) {
      return (
        <div>
          <div className="modal" onClick={props.closeFunc}></div>
          <div className="modalConLogout modalCon">
            <div>
              <h3>ログアウトしますか?</h3>
            </div>
            <div className="mt25 flexNormal spBw">
              <button type="button" className="w48 h50px btFormat1 flexCen hrefBox">
                <b>ログアウトする</b>
                <a className="hrefBoxIn" onClick={props.logoutFunc}></a>
              </button>
              <button type="button" onClick={props.closeFunc} className="w48 h50px closeModal flexCen btNegative hrefBox">
                <b>キャンセル</b>
              </button>
            </div>
          </div>
        </div>
      )
    }
    return (<></>)
}

export default DelWantedComponent;