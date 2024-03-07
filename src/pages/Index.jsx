import React, { useState, useRef } from "react";
import { Box, Button, Flex, Heading, IconButton, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, VStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";

const tracks = [
  {
    title: "Song 1",
    artist: "Artist 1",
    audioSrc: "path/to/audio1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MHx8fHwxNzA5Nzk5NjY3fDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    audioSrc: "path/to/audio2.mp3",
    imageSrc: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MHx8fHwxNzA5Nzk5NjY3fDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  // Add more tracks here
];

const Index = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? tracks.length - 1 : prevIndex - 1));
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === tracks.length - 1 ? 0 : prevIndex + 1));
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (value) => {
    audioRef.current.currentTime = value;
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <Box maxWidth="400px" mx="auto" mt={8}>
      <VStack spacing={4}>
        <Image src={currentTrack.imageSrc} alt="Album Cover" borderRadius="md" />
        <Heading as="h2" size="lg">
          {currentTrack.title}
        </Heading>
        <Text>{currentTrack.artist}</Text>
        <Slider aria-label="track-seek" value={currentTime} min={0} max={duration} onChange={handleSeek}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Flex>
          <IconButton aria-label="Previous Track" icon={<FaBackward />} onClick={handlePrevTrack} mr={4} />
          <Button leftIcon={isPlaying ? <FaPause /> : <FaPlay />} onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <IconButton aria-label="Next Track" icon={<FaForward />} onClick={handleNextTrack} ml={4} />
        </Flex>
      </VStack>
      <audio ref={audioRef} src={currentTrack.audioSrc} onEnded={handleNextTrack} onTimeUpdate={handleTimeUpdate} />
    </Box>
  );
};

export default Index;
