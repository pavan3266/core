import "jest-extended";

import { TimelockTransferHandler } from "../../../src/handlers/transactions/timelock-transfer";
import { Bignum } from "../../../src/utils";
import { transaction as originalTransaction } from "./__fixtures__/transaction";
import { wallet as originalWallet } from "./__fixtures__/wallet";

const handler = new TimelockTransferHandler();

let wallet;
let transaction;
let errors;

beforeEach(() => {
    wallet = originalWallet;
    transaction = originalTransaction;

    errors = [];
});

describe("TimelockTransferHandler", () => {
    describe("canApply", () => {
        it("should be true", () => {
            expect(handler.canApply(wallet, transaction, [])).toBeTrue();
        });

        it("should be false", () => {
            transaction.senderPublicKey = "a".repeat(66);

            expect(handler.canApply(wallet, transaction, [])).toBeFalse();
        });

        it("should be false if wallet has insufficient funds", () => {
            wallet.balance = Bignum.ZERO;

            expect(handler.canApply(wallet, transaction, errors)).toBeFalse();
            expect(errors).toContain("Insufficient balance in the wallet");
        });
    });
});
