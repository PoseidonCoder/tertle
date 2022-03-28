import { useState, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	SafeAreaView,
	Modal,
	TouchableOpacity,
} from "react-native";
import {
	AntDesign,
	MaterialCommunityIcons,
	Fontisto,
} from "@expo/vector-icons";
import Divider from "./components/Divider";
import wordle from "./wordle.json";
import Settings from "./components/Settings";
import styles from "./styles";

const milisecondsInDay = 1000 * 3600 * 24;

function dateToWordle(date) {
	const difference = Math.floor(
		(date - new Date("3/25/2022").getTime()) / milisecondsInDay
	);

	return 279 + difference;
}

const boardDefault = [...Array(6)].map((e) => Array(5).fill(""));
const letters = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["z", "x", "c", "v", "b", "n", "m"],
];

export default function App() {
	const [board, setBoard] = useState(JSON.parse(JSON.stringify(boardDefault)));
	const [current, setCurrent] = useState(dateToWordle(new Date().getTime()));
	const [guessValue, setGuessValue] = useState("");
	const [guessStatus, setGuessStatus] = useState({});
	const [showSettings, setShowSettings] = useState(false);
	const won = useRef(false);
	const currentRow = useRef(0);
	const currentColumn = useRef(0);
	const answer = wordle.answers[current];

	function submit() {
		if (board[currentRow.current][4] !== "") {
			if (
				wordle.words.includes(guessValue) ||
				wordle.answers.includes(guessValue)
			) {
				board.forEach((row) => {
					let correct = 0;

					row.forEach((char, i) => {
						if (answer.includes(char.toLowerCase())) {
							if (answer.indexOf(char.toLowerCase()) === i) {
								setGuessStatus((guess) => {
									guess[char] = "#6aaa64";
									return guess;
								});

								correct++;
							} else {
								setGuessStatus((guess) => {
									guess[char] = "#c9b458";
									return guess;
								});
							}
						} else {
							setGuessStatus((guess) => {
								guess[char] = "#86888a";
								return guess;
							});
						}
					});

					if (correct === 5) won.current = true;
				});

				if (!won.current) {
					if (board[5][4] !== "") {
						alert("The answer was: " + answer);
					} else {
						currentRow.current++;
						currentColumn.current = 0;
					}
				}
			} else {
				const boardCopy = board.slice();
				boardCopy[currentRow.current] = ["", "", "", "", ""];
				setBoard(boardCopy);

				currentColumn.current = 0;

				alert("Not in word list");
			}

			setGuessValue("");
		}
	}

	function guess(text) {
		if (
			(text.match(/[a-z]/i) || text == "") &&
			!won.current &&
			board[5][4] === ""
		) {
			setBoard((board) => {
				board[currentRow.current] = board[currentRow.current].map((_, i) =>
					text[i] ? text[i].toUpperCase() : ""
				);
				return board;
			});

			setGuessValue(text);

			if (board[currentRow.current][4] === "") currentColumn.current++;
		}
	}

	function reset() {
		currentRow.current = 0;
		currentColumn.current = 0;
		won.current = false;
		setGuessStatus({});
		setBoard(JSON.parse(JSON.stringify(boardDefault)));
	}

	function next() {
		reset();
		setCurrent(current + 1);
	}

	function back() {
		reset();
		setCurrent(current - 1);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Settings
				answer={answer}
				visible={showSettings}
				onClose={() => setShowSettings(!showSettings)}
			/>

			<View style={styles.header}>
				<Text
					style={{
						fontSize: 37,
						fontWeight: "700",
					}}
				>
					<TouchableOpacity onPress={back}>
						<AntDesign name="caretleft" size={37} color="black" />
					</TouchableOpacity>
					Wordle#{current}
					<TouchableOpacity onPress={next}>
						<AntDesign name="caretright" size={37} color="black" />
					</TouchableOpacity>
				</Text>

				<TouchableOpacity onPress={() => setShowSettings(!showSettings)}>
					<Fontisto name="spinner-cog" size={24} color="black" />
				</TouchableOpacity>
			</View>

			<Divider />

			{board.map((row, i) => (
				<View style={styles.row} key={i}>
					{row.map((char, k) => (
						<Text
							style={
								i < currentRow.current ||
								(won.current && i === currentRow.current)
									? [
											styles.box,
											{
												backgroundColor: answer.includes(char.toLowerCase())
													? answer.indexOf(char.toLowerCase()) === k
														? "#6aaa64"
														: "#c9b458"
													: "#86888a",
												color: "white",
												borderWidth: 0,
											},
									  ]
									: styles.box
							}
							key={k}
						>
							{char}
						</Text>
					))}
				</View>
			))}

			{letters.map((row, i) => (
				<View key={i} style={styles.buttonRow}>
					{i === 2 && (
						<TouchableOpacity
							style={[
								styles.button,
								{
									width: 60,
								},
							]}
							onPress={submit}
						>
							<Text
								style={{
									color: board[currentRow.current][4] === "" ? "gray" : "black",
									fontWeight: "bold",
								}}
							>
								ENTER
							</Text>
						</TouchableOpacity>
					)}
					{row.map((letter, k) => (
						<TouchableOpacity
							style={
								guessStatus[letter.toUpperCase()]
									? [
											styles.button,
											{
												backgroundColor: guessStatus[letter.toUpperCase()],
											},
									  ]
									: styles.button
							}
							key={k}
							onPress={() => guess(guessValue + letter)}
						>
							<Text
								style={{
									fontSize: 20,
									color: guessStatus[letter.toUpperCase()] ? "white" : "black",
								}}
							>
								{letter.toUpperCase()}
							</Text>
						</TouchableOpacity>
					))}
					{i === 2 && (
						<TouchableOpacity
							style={[styles.button, { width: 50 }]}
							onPress={() => guess(guessValue.slice(0, -1))}
						>
							<MaterialCommunityIcons
								name="backspace-outline"
								size={30}
								color="black"
							/>
						</TouchableOpacity>
					)}
				</View>
			))}
		</SafeAreaView>
	);
}
