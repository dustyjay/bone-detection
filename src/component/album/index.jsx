import { useEffect, useState } from "react";
import "./index.css";
import AlbumImages from "../album-images";

const Album = ({ albumName, groups }) => {
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    setSelectedGroup(groups[0]);
  }, [groups]);

  useEffect(() => {
    if (selectedGroup?.images?.length > selectedGroup?.thumbnails?.length) {
      setSelectedGroup({ ...selectedGroup, thumbnails: selectedGroup.images });
    }
  }, [selectedGroup]);
  return (
    <div>
      <div className="paginate-header-sub-wrapper">
        <h1>{albumName}</h1>
        {selectedGroup && (
          <span>
            {selectedGroup?.total} of {selectedGroup?.total}
          </span>
        )}
      </div>
      <div>
        {/* navigation component start */}
        <nav>
          <ul className="list-main-nav-inner">
            {groups.map((group) => (
              <li
                key={group.name}
                onClick={() => setSelectedGroup(group)}
                className={`list-main-nav-item title-color-txt ${
                  group.name === selectedGroup?.name
                    ? "active-list-main-nav-item"
                    : ""
                }`}
              >
                {group.name}
              </li>
            ))}
          </ul>
        </nav>
        {/* navigation component end */}
        {selectedGroup && <AlbumImages images={selectedGroup.thumbnails} />}
      </div>
    </div>
  );
};

export default Album;
