import { NextPage } from "next";

interface Mess {
  mess: string;
}

export const MessageArea: NextPage<Mess> = ({ mess }) => {
  return mess ? (
    <div className="w100">
      <div className="mb10 aMess">
        <p>{mess}</p>
      </div>
    </div>
  ) : (
    <></>
  );
};
