import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const Home = () => {
  const [url, setUrl] = useState("");
  const [baba, setBaba] = useState("");
  const [find, setFind] = useState([]);
  const [id, setId] = useState([]);
  const [get, setGet] = useState([]);
  const [what, setWhat] = useState(false);

  const shortUrl = async () => {
    const newUrl = { url: url, baba: baba };
    setFind([...find, newUrl]);
    console.log(url);

    if (!url) {
      return;
    }

    axios
      .post("http://localhost:3001/", {
        url: url,
      })
      .then((res) => {
        // console.log(res.data.shortUrl)
        setBaba(res.data.shortUrl);
        setId(res.data._id);
        console.log(baba);
        console.log(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const dltBnt = async () => {
    axios.delete(`http://localhost:3001/${id}`).then((res) => {
      console.log("delete bolchihloo");
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((res) => {
        setGet(res.data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.back}>
        <div>
          <div className={styles.flex}>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={styles.npt}
            ></input>
            <button onClick={shortUrl} className={styles.btn}>
              short
            </button>
          </div>
          <div className={styles.map}>
            <div className={styles.jjj}>
              {find.map((give) => {
                console.log(give);
                return (
                
                  <div className={styles.block}>
                    <a className={styles.local}>{give.url}</a>
                   <hr></hr>
                    <a className={styles.local}>http://localhost:3001/{give.baba}</a>
                  </div>
              
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
