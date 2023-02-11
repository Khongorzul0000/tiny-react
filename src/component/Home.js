import axios from "axios";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const Home = () => {
  const [url, setUrl] = useState("");
  const [baba, setBaba] = useState("");
  const [find, setFind] = useState([]);
  const [what, setWhat] = useState(false)

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
        console.log(baba);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    // .get(`http://localhost:3001/${baba}`)
    // .then((res)=>{
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  };

  return (
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
          {find.map((give) => {
            console.log(give);
            return (
              <div className={styles.gap}>
                <div className={styles.full}>
                  <p className={styles.url}>full url</p>

                  <a>{give.url}</a>
                </div>
                <div className={styles.ful}>
                  <p className={styles.url}>short url</p>
                  <a>http://localhost:3001/{give.baba} </a>
                  <CopyToClipboard text={baba} onCopy={() => setWhat(true)}>
                  <button>bdmnvb</button>
                  </CopyToClipboard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
