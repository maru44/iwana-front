import { NextPage } from 'next';
import { deleteWanted } from './Helper';

// delete wanted component
const DelWantedComponent: NextPage<{slug: string, open: boolean}> = (slug, open) => {
    let parentOpen = open;

    const delClose = (e: any) => {
        e.preventDefault();
        parentOpen = false;
    }

    // delete wanted
    const deleteW = (e: any) => {
        e.preventDefault();
        deleteWanted(e);
    }

    if (parentOpen) {
      return (
        <div>
          <div className="modalCon" onClick={delClose}></div>
          <div className="modalDelWanted modalCon">
            <div>
              <h3>削除しますか?</h3>
            </div>
            <div className="mt25 flexNormal spBw">
              <button type="button" onClick={deleteW} className="w48 h50px btFormat1 flexCen hrefBox">
                <b>削除する</b>
                <a className="hrefBoxIn"></a>
              </button>
              <button type="button" onClick={delClose} data-wanted={ slug } className="w48 h50px closeModal flexCen btNegative hrefBox">
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