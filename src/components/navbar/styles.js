
export const ButtonStyle = {
    login: {
        rounded:"lg",
        px:4,
        py:2,
        color:["blue.600", "blue.800", "white", "white"],
        bg:["orange.400", "blue.100", "green.500", "green.500"],
        _hover:{ bg: ["orange.200", "green.100", "green.600", "green.600"]}
    },
    register: {
        rounded:"lg",
        px:4,
        py:2,
        color:["green.500", "green.500", "green.600", "green.600"],
        bg:["white", "white", "gray.100", "gray.100"],
        _hover:{bg: ["gray.300", "gray.300", "gray.300", "gray.300"]}
    },
    logout: {
        rounded:"lg",
        px:4,
        py:2,
        color:["white", "white", "green.900", "green.900"],
        bg:["red.500", "red.500", "red.550", "red.550"],
        _hover:{bg: ["gray.300", "gray.300", "red.700", "red.700"]}
    }
}
