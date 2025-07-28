
import styled from "styled-components"
import React from 'react';


const SkeletonCardContainer = styled.div`
  width: 160px;
  height: 300px;
  background: #eee;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 70%;
  background: #ccc;
  border-radius: 8px;
`;

const SkeletonText = styled.div`
  width: 80%;
  height: 15px;
  background: #ddd;
  margin: 10px auto;
  border-radius: 5px;
`;

const SkeletonCard = () => (
  <SkeletonCardContainer>
    <SkeletonImage />
    <SkeletonText />
    <SkeletonText />
  </SkeletonCardContainer>
);

export default SkeletonCard;

// const SkeletonItem = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: #f2f2f2;
//   position: relative;
//   overflow: hidden;
//   border-radius:  4px;

//   @keyframes skeleton-gradient{
//     0% {
//       background-color: rgba(165,165,165, 0.1);
//     }
//     50% {
//       background-color: rgba(165,165,165, 0.3);
//     }
//     100% {
//       background-color: rgba(165,165,165, 0.1);
//     }
//   }
//   &:before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     animation: skeleton-gradient 1.5s infinite ease-in-out;
//   }
// ` 