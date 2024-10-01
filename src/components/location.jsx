import React, { useEffect } from "react";
import { Divider } from "antd";
import styled from "styled-components";
import Flower from "../assets/flower2.png";

const Wrapper = styled.div`
  padding-top: 42px;
  width: 70%;
  margin: 0 auto;
`;

const Title = styled.span`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 1.375rem;
  padding-bottom: 42px;
`;

const Content = styled.p`
  font-size: 0.875rem;
  line-height: 1.75;
  opacity: 0.75;
  width: 100%;
  text-align: center;
  padding-top: 42px;
  padding-bottom: 42px;
  margin: 0;
`;

const Map = styled.div`
  width: 100%;
  padding: 0;
`;

const Location = () => {
  // 카카오 맵 불러오기

  // <!-- 3. 실행 스크립트 -->
  const executeScript = () => {
    const scriptTag = document.createElement("script");
    const inlineScript = document.createTextNode(`new daum.roughmap.Lander({
    "timestamp" : "1727799502620",
    "key" : "2kse4",
    "mapWidth" : "640",
    "mapHeight" : "360"
  }).render();`);
    scriptTag.appendChild(inlineScript);
    document.body.appendChild(scriptTag);
  };

  // <!-- 2. 설치 스크립트 * 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다. -->
  // document.write 문제가 발생해서 해당 파일을 직접 가져온다음 수정했음
  const InstallScript = () => {
    (function () {
      let c = window.location.protocol === "https:" ? "https:" : "http:";
      let a = "16137cec";

      if (window.daum && window.daum.roughmap && window.daum.roughmap.cdn) {
        return;
      }
      window.daum = window.daum || {};
      window.daum.roughmap = {
        cdn: a,
        URL_KEY_DATA_LOAD_PRE: c + "//t1.daumcdn.net/roughmap/",
        url_protocal: c,
      };
      let b =
        c +
        "//t1.daumcdn.net/kakaomapweb/place/jscss/roughmap/" +
        a +
        "/roughmapLander.js";

      // document.write -> doumnet.body.append로 수정
      const scriptTag = document.createElement("script");
      scriptTag.src = b;
      document.body.append(scriptTag);
      scriptTag.onload = () => {
        executeScript();
      };
    })();
  };

  function tMap(name,lat,lng){
    // eslint-disable-next-line no-restricted-globals
    location.href = "https://apis.openapi.sk.com/tmap/app/routes?appKey=40j95nZG9Y5rlJLRNOfSZ2J1ar9TcjemTlDLpGHi&name="+name+"&lon="+lng+"&lat="+lat;
  }

  useEffect(() => {
    InstallScript();
  }, [InstallScript]);

  return (
    <Wrapper>
      <Divider plain style={{ marginTop: 0, marginBottom: 32 }}>
        <Title>오시는 길</Title>
      </Divider>
      <Image src={Flower} />
      <div
        style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          marginBottom: 30
        }}
      >
        <a id="tmap_guide" onClick={()=>tMap('웨딩의 전당','35.84843','127.1594')}>
            <img width={48} height={'auto'} src={require("../assets/tmap.png")}/>
        </a>
        <a href="https://naver.me/IgJFfoYv">
            <img width={48} height={'auto'} src={require("../assets/naver-map.png")} />
        </a>
        <a href="https://kko.to/-NiQc93l-h">
            <img width={48} height={'auto'} src={require("../assets/kakao-map.png")} />
        </a>
        <a href="https://maps.app.goo.gl/mwuXMm516sZ6Qxps5">
            <img width={48} height={'auto'} src={require("../assets/google-map.png")} />
        </a>
      </div>
      <Map
        id="daumRoughmapContainer1727799502620"
        className="root_daum_roughmap root_daum_roughmap_landing"
      ></Map>
      <Content>
      전북 전주시 덕진구 백제대로 832
      <br/>
      (지번) 우아동3가 752-4
        <br />
        웨딩의 전당, 1층 소노홀
        <br />
        <br />
        <Title>기차 이용시</Title>
        <br />
        <br />
        전주역 하차 (도보 7분)
      </Content>
    </Wrapper>
  );
};

export default Location;
