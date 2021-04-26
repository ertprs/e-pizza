import React from "react";
import Link from "next/link";
import styled from "./header.module.scss";
import { Container } from "../Container";

export function Header() {
  return (
    <div className={styled.container}>
      <Container>
        <div className={styled.title}>
          <Link href="/">
            <p>E-Pizza</p>
          </Link>
        </div>
        <div>
          <ul className={styled.navegatinon_container}></ul>
        </div>
      </Container>
    </div>
  );
}
