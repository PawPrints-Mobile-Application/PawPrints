interface Props {
  DSignin: string;
  TSignin: string;
  uid: string;
}

class Model implements Props {
  DSignin: string;
  TSignin: string;
  uid: string;

  constructor(DSignin: string, TSignin: string, uid: string) {
    this.DSignin = DSignin;
    this.TSignin = TSignin;
    this.uid = uid;
  }
}

export type { Props };
export default Model;
