public class DeckList {
    public static void main(String[] args) {

        String[] suits = {"spades", "hearts", "diamonds", "clubs"};
        for (int i = 0; i < 4; i++) {
            for (int c = 2; c < 11; c++) {
                System.out.print("'" + c + "_of_" + suits[i] + ".png', ");
            }
            System.out.print("'jack_of_" + suits[i] + ".png', ");
            System.out.print("'queen_of_" + suits[i] + ".png', ");
            System.out.print("'king_of_" + suits[i] + ".png', ");
            System.out.print("'ace_of_" + suits[i] + ".png', ");
        }
    }
}
