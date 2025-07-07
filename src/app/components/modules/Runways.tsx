import { FunctionComponent } from "react";
import { RunwaysProps } from "../types/common.types";
import { RUNWAY } from "@/app/lib/constantes";

const Runways: FunctionComponent<RunwaysProps> = ({ dict }) => {
  return (
    <div className="runway-section" id="Runways">
      <div className="runway-container">
        <div className="runway-header">
          <div className="runway-title">{dict?.runway}</div>
          <div className="runway-subtitle">
            <span className="runway-line"></span>
            <span className="runway-text">{dict?.week}</span>
            <span className="runway-line"></span>
          </div>
        </div>

        <div className="runway-grid">
          {RUNWAY.slice(3).map((video, index) => (
            <div key={index} className="runway-card">
              <div className="runway-video-container">
                <video
                  className="runway-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={video.poster}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="runway-overlay">
                  <div className="runway-info">
                    <div className="runway-collection-title">{video.title}</div>
                    <p className="runway-designer">{video.designer}</p>
                    <p className="runway-season">{video.season}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="runway-featured">
          <div className="runway-featured-content">
            <div className="runway-featured-video">
              <video
                className="runway-hero-video"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/streetwear1.png"
              >
                <source src="/videos/streetwear1.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="runway-featured-text">
              <div className="runway-featured-title">{dict?.feature}</div>
              <p className="runway-featured-description">{dict?.exp}</p>
              <div className="runway-featured-details">
                <div className="runway-detail">
                  <span className="runway-detail-label">{dict?.des}</span>
                  <span className="runway-detail-value">
                    Global Designer Network
                  </span>
                </div>
                <div className="runway-detail">
                  <span className="runway-detail-label">{dict?.ses}</span>
                  <span className="runway-detail-value">
                    Digital Renaissance
                  </span>
                </div>
                <div className="runway-detail">
                  <span className="runway-detail-label">{dict?.coll}</span>
                  <span className="runway-detail-value">Web3 Couture</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="runway-featured">
          <div className="runway-featured-content">
            <div className="runway-featured-video">
              <video
                className="runway-hero-video"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/streetwear2.png"
              >
                <source src="/videos/streetwear2.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="runway-featured-text">
              <div className="runway-featured-title">{dict?.feature}</div>
              <p className="runway-featured-description">{dict?.exp}</p>
              <div className="runway-featured-details">
                <div className="runway-detail">
                  <span className="runway-detail-label">{dict?.des}</span>
                  <span className="runway-detail-value">
                    Global Designer Network
                  </span>
                </div>
                <div className="runway-detail">
                  <span className="runway-detail-label">{dict?.ses}</span>
                  <span className="runway-detail-value">
                    Digital Renaissance
                  </span>
                </div>
                <div className="runway-detail">
                  <span className="runway-detail-label">{dict?.coll}</span>
                  <span className="runway-detail-value">Web3 Couture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Runways;
