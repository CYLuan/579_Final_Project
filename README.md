
### Project Overview

The project involved developing a Chrome extension named "Virtual Study Room" aimed at helping users boost productivity when studying. The extension features a Pomodoro timer with customizable durations, motivational quotes, ambient themes, sound settings, and interactive controls to start, pause, and reset the timer.

### Achievements
I've achieved the features that I proposed.

- **Pomodoro Timer Functionality**: Successfully implemented the core Pomodoro functionality that includes a countdown timer which the user can start, pause, and reset.
- **Customization Features**:
  - **Timer Duration**: Users can select their preferred session duration from a dropdown menu, instantly updating the timer.
  - **Ambient Themes**: Users can choose from different themes like "Library" and "Café" to enhance their focus.
  - **Ambient Sound**: Users can choose from different sounds like "Cafe" and "Forest" to enhance their focus. Users can mute the sound, too.
  - **Motivational Quotes**: Random motivational quotes are displayed every time the extension is loaded to inspire users.
- **Interactive Controls**:
  - Converted control buttons to icon-based buttons using Font Awesome for a modern, intuitive user interface.
  - Added functionality to remember user settings across sessions using local storage for themes, sounds, and timer durations.

### Resolved Struggles

- The extension initially had multiple scripts setting window.onload, which caused some initialization scripts to overwrite others, leading to functionalities not loading properly when the extension started. I then consolidated all initialization scripts into a single window.onload function.
- Initially when I muted the audio and then switched to another audio source, the new audio automatically played despite the mute button showing a muted state. To resolve this issue, I centralized the audio control logic into a single function handleAudioPlayback, which checks the isMuted state and appropriately plays or pauses the audio. This function is called after the audio data loads (onloadeddata event) and when the mute state changes, ensuring consistent application of the mute setting. 

### Future Enhancements

- Fully Customizable Timer Durations: Extend the current customization options to allow users to specify exact minutes for Pomodoros, short breaks, and long breaks directly through an input field or slider.
- Smart Notifications: Implement smarter notifications that suggest breaks or the next Pomodoro based on user activity or inactivity detected through the browser.
- Enable the extension to open in a new tab for a more integrated and immersive user experience.

### Project Structure

- **`hello.html`**: Contains the HTML structure of the popup displayed when the user clicks the extension icon. It includes input controls for setting the timer, choosing themes/sounds, and viewing quotes.
- **`popup.css`**: Provides styling for the popup.
- **`popup.js`**: Handles all the logic for timer functionality, theme switching, audio control, randomized quotes, and storage of user preferences.
- **`manifest.json`**: Configures a Chrome extension named "Virtual Study Room", providing basic functionality with permissions to access active tabs and set alarms.
