import { NextPage } from 'next';
import { deleteWanted } from './Helper';

interface ModalParams {
  slug: string,
  open: boolean,
  func: any,
}

// delete wanted component
const DelWantedComponent: NextPage<ModalParams> = (props) => {

    let parentOpen = props.open;
    
    const deleteW = (e: any) => {
        e.preventDefault();
        deleteWanted(e);
    }

    if (parentOpen) {
      return (
        <div>
          <div className="modal" onClick={props.func}></div>
          <div className="modalDelWanted modalCon">
            <div>
              <h3>削除しますか?</h3>
            </div>
            <div className="mt25 flexNormal spBw">
              <button type="button" onClick={deleteW} data-wanted={ props.slug } className="w48 h50px btFormat1 flexCen hrefBox">
                <b>削除する</b>
                <a className="hrefBoxIn"></a>
              </button>
              <button type="button" onClick={props.func} className="w48 h50px closeModal flexCen btNegative hrefBox">
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