import { useState, useRef } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import Divider from "./components/Divider";
import wordle from "./wordle.json";
import Settings from "./components/Settings";
import styles from "./styles";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";

const milisecondsInDay = 1000 * 3600 * 24;

function dateToWordle(date) {
	const difference = Math.floor(
		(date - new Date("3/25/2022").getTime()) / milisecondsInDay
	);

	return 279 + difference;
}

const boardDefault = [...Array(6)].map((e) => Array(5).fill(""));

export default function App() {
	const [board, setBoard] = useState(JSON.parse(JSON.stringify(boardDefault)));
	const [current, setCurrent] = useState(dateToWordle(new Date().getTime()));
	const [guessValue, setGuessValue] = useState("");
	const [guessStatus, setGuessStatus] = useState({});
	const [showSettings, setShowSettings] = useState(false);
	const won = useRef(false);
	const currentRow = useRef(0);
	const currentColumn = useRef(0);
	const lastRow = useRef(0);
	const answer = wordle.answers[current];

	function charColor(char, i) {
		return answer.includes(char.toLowerCase())
			? answer.indexOf(char.toLowerCase()) === i
				? "#6aaa64"
				: "#c9b458"
			: "#86888a";
	}

	function submit() {
		if (board[currentRow.current][4] !== "") {
			if (
				wordle.words.includes(guessValue) ||
				wordle.answers.includes(guessValue)
			) {
				board.forEach((row) => {
					let correct = 0;

					row.forEach((char, i) => {
						setGuessStatus((guess) => {
							guess[char] = charColor(char, i);

							if (guess[char] === "#6aaa64") correct++;

							return guess;
						});
					});

					if (correct === 5) won.current = true;
				});

				if (!won.current) {
					if (board[5][4] !== "") {
						alert("The answer was: " + answer);
					} else {
						currentColumn.current = 0;
					}
				}

				currentRow.current++;
				lastRow.current++;
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
		lastRow.current = 0;
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

			<Board board={board} currentRow={currentRow} charColor={charColor} />

			<Keyboard
				guessStatus={guessStatus}
				guessValue={guessValue}
				submit={submit}
				guess={guess}
				board={board}
				currentRow={currentRow}
			/>
		</SafeAreaView>
	);
}
