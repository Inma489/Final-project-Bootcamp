import React from "react";
import { IPhoto, IDecoded } from "../interfaces";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IGlobalState } from "../reducers";
import { Link } from "react-router-dom";
import "../css/photoDetail.css";

interface IPropsGlobal {
  photos: IPhoto[];
  decoded: IDecoded;
  token: string;
}

const PhotoDetail: React.FC<
  IPropsGlobal & RouteComponentProps<{ photoId: string }>
> = props => {
  const { Icon } = require("react-materialize");
  const myPhoto = props.photos.find(p => p._id === props.match.params.photoId);

  if (!myPhoto) {
    return null;
  }
  return (
    <div className="usersBackground">
      <div className="section container">
        <Link to={"/myPosts/" + props.decoded._id}>
          <Icon className="x">close</Icon>
        </Link>
        <div className="row">
          <div className="col s12 box1">
            <img
              className="responsive-img photoInfo"
              width="93%"
              src={"http://localhost:8080/uploads/photos/" + myPhoto.filename}
              alt=""
            />

            <div className="revealinfo overlay1">
              <h6 className="texts">
                Title<Icon>create</Icon>
              </h6>
              <p className="texts1">{myPhoto.name}</p>
              <h6 className="texts">
                Camera<Icon>camera_alt</Icon>
              </h6>
              <p className="texts1">{myPhoto.camera}</p>
              <h6 className="texts">
                Location<Icon>location_on</Icon>
              </h6>
              <p className="texts1">{myPhoto.localization}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: IGlobalState) => ({
  photos: state.photos,
  decoded: state.decoded,
  token: state.token
});

export default connect(mapStateToProps)(PhotoDetail);
