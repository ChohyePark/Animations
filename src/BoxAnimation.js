import { useState } from "react";
import styled from "styled-components";

// 화면 전체 Container
const Wrapper = styled.div`
  width: 100%;
  border: 3px solid blue;
`;

// 상자 라인 전체 Section
const Container = styled.div`
  width: 100%;
  height: 2000px;
  display: flex;
  justify-content: center;
`;

// 상자 라인 이미지
const LineImg = styled.img`
  max-width: 741px;
  border: 1px solid black;
`;

// 라인 덮는 레이어 이미지
const Layer = styled.div`
  z-index: 10;
  position: absolute;
  border: 2px solid red;
  width: 741px;
  height: 2000px;
  over-flow: hidden;
  display: flex;
  justify-content: center;
`;

// 왼쪽 상자 박스, position : inherit 부모 태그 상속
const LeftCircle = styled.div`
  position: inherit;
  width: 75px;
  height: 75px;
  background-color: white;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  opacity: ${(props) => props.opacity};
`;

// 오른쪽 상자 박스
const RightCircle = styled.div`
  position: inherit;
  width: 75px;
  height: 75px;
  background-color: white;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  opacity: ${(props) => props.opacity};
`;

// 가운데 상자 박스
const CenterCircle = styled.div`
  position: inherit;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top};
  opacity: ${(props) => props.opacity};
  z-index: 20;
`;

// 상자 이미지
const CircleImg = styled.img`
  width: 100%;
  height: 100%;
`;

// 상자 들어가는 문 박스
const Door = styled.div`
  top: 77.2%;
  left: 35%;
  position: absolute;
  width: 322px;
  height: 510px;
  border: 1px solid black;
`;

// 상자 들어가는 문 이미지
const DoorImg = styled.img`
  width: 100%;
  height: 100%;
`;

const BoxAnimation = () => {
  const [scrollY, setScrollY] = useState(window.scrollY); // ScrollY 값 동적으로 관리
  const handleScroll = () => {
    // ScrollY 값
    setScrollY(window.scrollY);
  };

  useState(() => {
    // 처음 로딩 되었을때, 이벤트 추가
    window.addEventListener("scroll", handleScroll);
    return () => {
      // 이벤트 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateLeftCircleStyles = () => {
    let left = "10%";
    let top = "24%";
    let opacity = 0;
    if (scrollY >= 0 && scrollY < 200) {
      left = "10%";
      top = "24%";
      opacity = 0;
    } else if (scrollY >= 200 && scrollY <= 648) {
      // 0 to 1, 200에서 648사이의 값
      // scrollY-200 : 현재 스크롤 위치에서 시작 기준점 (200)을 뺀 값, 기준점 200부터 현재 스크롤 위치까지의 차이를 나타냄
      // 648 - 200 : 전체 스크롤 구간의 길이, 스크롤이 진행이 시작 되는 200부터 끝나는 648까지의 거리를 계산한 값
      // scrollY가 200일 때, 0
      // scrollY가 648일 때, 1
      const scrollProgress = (scrollY - 200) / (648 - 200);
      // (32 - 24) : top 값이 변할 총 범위를 나타낸다. (8%)
      // scrollProgress가 0 일때, 0 * 8 = 0, 1 일때 1 * 8 = 8
      // 24 + scrollProgress * (32-24) 스크롤 진행도에 따라 top 값을 동적으로 계산하여, 최종적으로 24에서 32의까지의 변화를 나타낼 수 있음
      top = `${24 + scrollProgress * (32 - 24)}%`;
      left = `${10 + scrollProgress * (45 - 10)}%`;
      opacity = scrollProgress * 1;
    } else if (scrollY >= 648) {
      opacity = 0;
    } else {
      top = "32%";
      left = "45%";
      opacity = 1;
    }
    return {
      top,
      left,
      opacity,
    };
  };

  const calculateRightCircleStyles = () => {
    let right = "10%";
    let top = "24%";
    let opacity = 0;
    if (scrollY >= 0 && scrollY < 200) {
      right = "10%";
      top = "24%";
      opacity = 0;
    } else if (scrollY >= 200 && scrollY <= 648) {
      const scrollProgress = (scrollY - 200) / (648 - 200); // 0 to 1
      top = `${24 + scrollProgress * (32 - 24)}%`;
      right = `${10 + scrollProgress * (45 - 10)}%`;
      opacity = scrollProgress * 1;
    } else if (scrollY >= 648) {
      opacity = 0;
    } else {
      top = "32%";
      right = "45%";
      opacity = 1;
    }
    return {
      top,
      right,
      opacity,
    };
  };

  const calculateCenterCircleStyles = () => {
    let top = "24%";
    let opacity = 0;
    let width = 75;
    let height = 75;
    if (scrollY >= 0 && scrollY < 200) {
      top = "24%";
      opacity = 0;
    } else if (scrollY >= 200 && scrollY <= 648) {
      const scrollProgress = (scrollY - 200) / (648 - 200); // 0 to 1
      top = `${24 + scrollProgress * (32 - 24)}%`;
      opacity = scrollProgress * 1;
    } else if (scrollY >= 648 && scrollY <= 1106) {
      const scrollProgress = (scrollY - 648) / (1106 - 648);
      top = `${32 + scrollProgress * (80 - 32)}%`;
      opacity = 1;
    } else if (scrollY >= 1106 && scrollY <= 1500) {
      const scrollProgress = (scrollY - 1106) / (1500 - 1106);
      top = `${80 + scrollProgress * (88 - 80)}%`;
      width = 75 + scrollProgress * (230 - 75);
      height = 75 + scrollProgress * (230 - 75);
      opacity = 1;
    } else {
      width = 230;
      height = 230;
      top = "88%";
      opacity = 1;
    }
    return {
      top,
      opacity,
      width,
      height,
    };
  };

  const LeftCircleStyles = calculateLeftCircleStyles();
  const RightCircleStyles = calculateRightCircleStyles();
  const CenterCircleStyles = calculateCenterCircleStyles();

  return (
    <Wrapper>
      <Container>
        <LineImg src="https://www.reship.com/images/svgs/Lines.svg"></LineImg>
        <Layer>
          <LeftCircle
            top={LeftCircleStyles.top}
            left={LeftCircleStyles.left}
            opacity={LeftCircleStyles.opacity}
          >
            <CircleImg src="https://www.reship.com/images/svgs/magic-box.svg"></CircleImg>
          </LeftCircle>
          <CenterCircle
            top={CenterCircleStyles.top}
            opacity={CenterCircleStyles.opacity}
            width={CenterCircleStyles.width}
            height={CenterCircleStyles.height}
            translate={CenterCircleStyles.translate}
          >
            <CircleImg src="https://www.reship.com/images/svgs/magic-box.svg"></CircleImg>
          </CenterCircle>
          <RightCircle
            top={RightCircleStyles.top}
            right={RightCircleStyles.right}
            opacity={RightCircleStyles.opacity}
          >
            <CircleImg src="https://www.reship.com/images/svgs/magic-box.svg"></CircleImg>
          </RightCircle>
          <Door>
            <DoorImg src="https://www.reship.com/images/svgs/Door.svg"></DoorImg>
          </Door>
        </Layer>
      </Container>
      <Container></Container>
    </Wrapper>
  );
};

export default BoxAnimation;
