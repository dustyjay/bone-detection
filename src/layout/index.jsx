import { useEffect, useState } from "react";
import Logo from "../asset/dataspan_logo.png";
import "./index.css";
import Album from "../component/album";
import { fetchAlbumData, fetchS3Bucket } from "./helper";

const MainLayout = () => {
  const [albums, setAlbums] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filters, setFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState([]);

  const fetchAlbums = async () => {
    const doc = await fetchS3Bucket();
    if (!doc?.length) return;
    setAlbums(doc);
    const albumData = await fetchAlbumData(doc[0]);
    console.log(albumData);
    setGroups(albumData.groups);
    setFilters(albumData.filters);
  };

  const handlePillColor = (event) => {

    const filters = [
      "elbow positive",
      "fingers positive",
      "forearm fracture",
      "humerus fracture",
      "humerus",
      "shoulder fracture",
      "wrist positive",
    ];
    switch (event) {
      case filters[0]:
        return {
          pillBorderColor: "pill-sky-blue-outline",
          dotColor: "dot-circle-sky-blue",
        };
      case filters[1]:
        return {
          pillBorderColor: "pill-dark-lime-green-outline",
          dotColor: "dot-circle-dark-lime-green",
        };
      case filters[2]:
        return {
          pillBorderColor: "pill-teal-outline",
          dotColor: "dot-circle-teal",
        };
      case filters[3]:
        return {
          pillBorderColor: "pill-light-orange-outline",
          dotColor: "dot-circle-light-orange",
        };
      case filters[4]:
        return {
          pillBorderColor: "pill-dark-red-outline",
          dotColor: "dot-circle-dark-red",
        };
      case filters[5]:
        return {
          pillBorderColor: "pill-dark-orange-outline",
          dotColor: "dot-circle-dark-orange",
        };
      case filters[6]:
        return {
          pillBorderColor: "pill-dark-purple-outline",
          dotColor: "dot-circle-dark-purple",
        };
      default:
        return "";
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    console.log({ filters });
  }, [filters]);
  return (
    <>
      <div className="wrapper-main">
        <aside className="wrapper-main-sidebar">
          <section className="wrapper-main-sidebar-inner">
            <div className="logo-wrapper-main">
              <img src={Logo} alt="logo-avatar" className="logo-main" />
            </div>
            <div className="main-section-inner">
              <section className="class-filter-wrapper">
                <div className="title-color-txt">Class filter</div>
                <section>
                  <ul className="pill-wrapper-main">
                    {filters.map((filter) => (
                      <>
                        <li
                          className={`pill ${handlePillColor(filter)?.pillBorderColor}`}
                          key={filter}
                        >
                          <span className={`dot-main ${handlePillColor(filter)?.dotColor}`}>
                            <div className="txt-pill">{filter}</div>
                          </span>
                        </li>
                      </>
                    ))}
                  </ul>
                </section>
                <section className="poligon-"></section>
              </section>
              <section className="clear-filter-wrapper">
                <span>
                  <button className="clear-filter-btn trans-btn">
                    <span>
                      <svg
                        width="21"
                        height="23"
                        viewBox="0 0 21 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.75 5.99992C1.75 5.49366 2.14175 5.08325 2.625 5.08325H18.375C18.8582 5.08325 19.25 5.49366 19.25 5.99992C19.25 6.50618 18.8582 6.91659 18.375 6.91659H2.625C2.14175 6.91659 1.75 6.50618 1.75 5.99992Z"
                          fill="black"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.75 3.25008C8.51794 3.25008 8.29538 3.34666 8.13128 3.51857C7.96719 3.69048 7.875 3.92363 7.875 4.16675V6.00008C7.875 6.50634 7.48325 6.91675 7 6.91675C6.51675 6.91675 6.125 6.50634 6.125 6.00008V4.16675C6.125 3.4374 6.40156 2.73793 6.89385 2.2222C7.38613 1.70648 8.05381 1.41675 8.75 1.41675H12.25C12.9462 1.41675 13.6139 1.70648 14.1062 2.2222C14.5984 2.73793 14.875 3.4374 14.875 4.16675V6.00008C14.875 6.50634 14.4832 6.91675 14 6.91675C13.5168 6.91675 13.125 6.50634 13.125 6.00008V4.16675C13.125 3.92363 13.0328 3.69048 12.8687 3.51857C12.7046 3.34666 12.4821 3.25008 12.25 3.25008H8.75ZM4.375 5.08341C4.85825 5.08341 5.25 5.49382 5.25 6.00008V18.8334C5.25 19.0765 5.34219 19.3097 5.50628 19.4816C5.67038 19.6535 5.89294 19.7501 6.125 19.7501H14.875C15.1071 19.7501 15.3296 19.6535 15.4937 19.4816C15.6578 19.3097 15.75 19.0765 15.75 18.8334V6.00008C15.75 5.49382 16.1418 5.08341 16.625 5.08341C17.1082 5.08341 17.5 5.49382 17.5 6.00008V18.8334C17.5 19.5628 17.2234 20.2622 16.7312 20.778C16.2389 21.2937 15.5712 21.5834 14.875 21.5834H6.125C5.42881 21.5834 4.76113 21.2937 4.26884 20.778C3.77656 20.2622 3.5 19.5628 3.5 18.8334V6.00008C3.5 5.49382 3.89175 5.08341 4.375 5.08341Z"
                          fill="black"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.75 9.66675C9.23325 9.66675 9.625 10.0772 9.625 10.5834V16.0834C9.625 16.5897 9.23325 17.0001 8.75 17.0001C8.26675 17.0001 7.875 16.5897 7.875 16.0834V10.5834C7.875 10.0772 8.26675 9.66675 8.75 9.66675Z"
                          fill="black"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.25 9.66675C12.7332 9.66675 13.125 10.0772 13.125 10.5834V16.0834C13.125 16.5897 12.7332 17.0001 12.25 17.0001C11.7668 17.0001 11.375 16.5897 11.375 16.0834V10.5834C11.375 10.0772 11.7668 9.66675 12.25 9.66675Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    <span className="title-color-txt">Clear Filters</span>
                  </button>
                </span>
                <span>
                  <button className="trans-btn txt-color-grey">
                    Need help?
                  </button>
                </span>
              </section>
            </div>
          </section>
        </aside>
        <aside className="right-wrapper-layout">
          <section className="album-wrapper-main">
            {albums.map((name) => (
              <Album key={name} albumName={name} groups={groups} />
            ))}
          </section>
        </aside>
      </div>
    </>
  );
};

export default MainLayout;
