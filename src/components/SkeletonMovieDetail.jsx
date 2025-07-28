import React from 'react';
import styled from 'styled-components';

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Skeleton = styled.div`
  width: 100%;
  height: 150px;
  background-color: #ccc;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const SkeletonText = styled.div`
  width: 60%;
  height: 20px;
  background-color: #ccc;
  margin: 5px 0;
  border-radius: 5px;
`;

const SkeletonMovieDetail = () => (
  <SkeletonWrapper>
    <Skeleton />
    <SkeletonText />
    <SkeletonText />
    <SkeletonText />
    <SkeletonText />
  </SkeletonWrapper>
);

export default SkeletonMovieDetail;
