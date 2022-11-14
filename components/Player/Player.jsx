import React, { useEffect, useRef, useState } from "react";
import { Player as VimePlayer, DefaultUi, Hls } from "@vime/react";
import "@vime/core/themes/default.css";
import styles from "./Player.module.scss";
import SkipIcon from "./skip.png";

import {
  Controls,
  PlaybackControl,
  Control,
  Scrim,
  ScrubberControl,
  ControlSpacer,
  VolumeControl,
  SettingsControl,
  FullscreenControl,
  CurrentTime,
  EndTime,
  ControlGroup,
  TimeProgress,
  PipControl,
  CaptionControl,
  Tooltip,
} from "@vime/react";
import { getFromLocalStorage, saveToLocalStorage } from "util/localStorage";
export const Player = ({ url, title, episodeNumber, subtitles = [] }) => {
  const playerRef = useRef(null);

  const seek = (duration) => {
    playerRef.current.currentTime += duration;
  };

  const setTime = () => {
    const savedTime = getFromLocalStorage(`${title}-${episodeNumber}-currentTime`);
    if (savedTime != null) {
      setTimeout(() => {
        playerRef.current.currentTime = +savedTime;
        playerRef.current.play()
        playerRef.current.setTextTrackVisibility(true)
      }, 300);

    }
  };

  useEffect(() => {
    let localRef = null;
    if (playerRef.current) localRef = playerRef.current;
    return () => {
      if (localRef.currentTime === 0) return;
      saveToLocalStorage(`${title}-${episodeNumber}-currentTime`, localRef.currentTime);
    };
  }, []);

  console.log({ url })
  return (
    <VimePlayer
      onVmReady={() => setTime(title, episodeNumber)}
      style={{ "--vm-settings-max-height": "200px" }}
      theme="dark"
      ref={playerRef}
    >
      <Hls crossOrigin="anonymous"
        version="latest">
        <source data-src={url} type="application/x-mpegURL" />
        {subtitles.map(s => {

          return (<track
            key={s.lang}
            kind="subtitles"
            src={s.url}
            label={s.lang}
            srcLang="en"

          />)
        })}
      </Hls>
      <DefaultUi noControls>
        {/* Center Controls for play/pause and changing episode */}
        <Controls
          align="center"
          pin="center"
          justify="space-evenly"
          style={{
            "--vm-controls-spacing": "80px",
          }}
        >
          <img
            className={styles.icon}
            src={SkipIcon.src}
            onClick={() => seek(-5)}
          />

          <PlaybackControl hideTooltip keys="k/ " />
          <img
            className={styles.icon}
            src={SkipIcon.src}
            onClick={() => seek(5)}
          />
        </Controls>

        <Scrim gradient="up" />

        <Controls pin="bottomLeft" direction={"column-reverse"}>
          <ControlGroup space={"top"}>
            <PlaybackControl keys="k/ " tooltipDirection="right" />
            <VolumeControl />

            <TimeProgress />
            <ControlSpacer />
            <CaptionControl />
            <PipControl keys="i" />
            <SettingsControl />

            <FullscreenControl tooltipDirection="left" />
          </ControlGroup>

          <ControlGroup>
            <ScrubberControl />
          </ControlGroup>
        </Controls>
      </DefaultUi>
    </VimePlayer>
  );
};
