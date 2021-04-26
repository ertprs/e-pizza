import React from "react";
import Link from "next/link";
import styled from "./header.module.scss";
import { Container } from "../Container";

export function Header() {
  return (
    <div className={styled.container}>
      <Container>
        <div style={{ display: "flex" }}>
          <div className={styled.aside}>
            <Link href="/">
              <p>E-Pizza</p>
            </Link>
          </div>
          <div>
            <ul className={styled.navegatinon_container}>
              {/* <li>
                <Link href="/">
                  <a>Catálogo</a>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
