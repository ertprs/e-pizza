import React from 'react';
import Link from 'next/link';
import styled from './header.module.scss';
import { Container } from '../Container';

export function Header() {
  return (
    <div className={styled.container}>
      <Container>
        <div className={styled.aside}>
          <p>E-Pizza</p>
        </div>

        <ul className={styled.navegatinon_container}>
          <li>
            <Link href="/">
              <a>Catálogo</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className={styled.active}>Mais vendidos</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Promoções</a>
            </Link>
          </li>
          <li>
            <Link href="/Criar">
              <a>Montar</a>
            </Link>
          </li>
        </ul>

        <div className={styled.aside}>
          <p>Usuário</p>
        </div>
      </Container>
    </div>
  );
}
