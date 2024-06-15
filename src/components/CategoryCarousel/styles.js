import styled from 'styled-components';
import Background from '../../assets/background.svg';

export const Container = styled.div`
  background: url('${Background}');
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  padding: 35px 0 51px 0;
`;

export const H1 = styled.h1``;

export const ContainerItens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  width: 318.045px;
  height: 231.986px;
  border-radius: 9.354px;
`;

export const Button = styled.button`
  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 22.45px;
  font-weight: 700;

  width: 161px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
`;
