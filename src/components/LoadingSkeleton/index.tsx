import React from 'react';
import styled, { keyframes } from 'styled-components';

function LoadingSkeleton (props: {}) {
  const loading = keyframes`
    100% { transform: translateX(100%); }
  `;
  const SkeletonLoading = styled.div`
    position: relative;
    background-color: #e2e2e2;
    
    &:after {
      display: block;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      background: -webkit-gradient(linear, left top, right top, from(transparent), color-stop(rgba(255, 255, 255, 0.2)), to(transparent));
      background: linear-gradient(90deg, transparent,rgba(255, 255, 255, 0.2), transparent);
      animation: ${loading} 0.8s infinite;  
    }
  `;
  
  const SkeletonContainer = styled.div`
    display: flex;
    background-color: #fff;
    height: auto;
    width: auto;
    overflow: hidden;
    margin: 12px;
  `;

  const SkeletonImage = styled(SkeletonLoading)`
    height: 120px;
    width: 120px;
  `;

  const SkeletonTitle = styled(SkeletonLoading)`
    padding: 8px;
    height: 0.125rem;
    width: 25%;
    margin: 1rem;
    border-radius: 3px;
  `;

  const SkeletonDescription = styled(SkeletonLoading)`
    padding: 8px;
    width: 30%;
    height: 2rem;
    margin: 1rem;
    border-radius: 3px;
  `;

  return (
    <SkeletonContainer>
      <SkeletonImage />
      <div style={{ width: '100%' }}>
        <SkeletonTitle />
        <SkeletonDescription />
      </div>
    </SkeletonContainer>
  );
}

export default LoadingSkeleton;