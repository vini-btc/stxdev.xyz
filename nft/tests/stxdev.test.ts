import {
  boolCV,
  noneCV,
  principalCV,
  someCV,
  stringAsciiCV,
  tupleCV,
  uintCV,
} from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;
const address2 = accounts.get("wallet_2")!;
const address3 = accounts.get("wallet_3")!;
const deployer = accounts.get("deployer")!;

describe("stxdev NFT token", () => {
  it("allows a user to mint a token with the last set price", () => {
    const { result, events } = simnet.callPublicFn(
      "stxdev",
      "mint",
      [principalCV(address1)],
      address1
    );
    expect(result).toBeOk(uintCV(1));
    expect(events).length(2);

    const expectedTokenMintEvent = events[1];
    expect(expectedTokenMintEvent.event).toBe("nft_mint_event");
    expect(expectedTokenMintEvent.data.value).toBeUint(1);
  });

  it("transfers the minting fee to the contract deployer once a token is minted", () => {
    const { events } = simnet.callPublicFn(
      "stxdev",
      "mint",
      [principalCV(address1)],
      address1
    );

    const expectedFeeTransferEvent = events[0];
    expect(expectedFeeTransferEvent.event).toBe("stx_transfer_event");
    expect(expectedFeeTransferEvent.data.amount).toBe("50000");
    expect(expectedFeeTransferEvent.data.sender).toBe(address1);
    expect(expectedFeeTransferEvent.data.recipient).toBe(deployer);
  });

  it("increases the token mint price by 10x every 25 tokens", () => {
    const mintTransactions = [];
    for (let i = 0; i <= 100; i = i + 1) {
      mintTransactions.push(
        simnet.callPublicFn("stxdev", "mint", [principalCV(address2)], address2)
      );
    }
    const txOne = mintTransactions[0];
    expect(txOne.events[0].event).toBe("stx_transfer_event");
    expect(txOne.events[0].data.amount).toBe("50000");

    const txTwentySix = mintTransactions[25];
    expect(txTwentySix.events[0].event).toBe("stx_transfer_event");
    expect(txTwentySix.events[0].data.amount).toBe("500000");

    const txFiftyOne = mintTransactions[50];
    expect(txFiftyOne.events[0].event).toBe("stx_transfer_event");
    expect(txFiftyOne.events[0].data.amount).toBe("5000000");

    const txAHundredAndOne = mintTransactions[100];
    expect(txAHundredAndOne.events[0].event).toBe("stx_transfer_event");
    expect(txAHundredAndOne.events[0].data.amount).toBe("500000000");
  });

  it("appends the token id to the uri", () => {
    for (let i = 0; i <= 10; i = i + 1) {
      simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    }
    const { result: firstTokenUri } = simnet.callReadOnlyFn(
      "stxdev",
      "get-token-uri",
      [uintCV(1)],
      address2
    );
    expect(firstTokenUri).toBeOk(
      someCV(stringAsciiCV("https://stxdev.xyz/token/1"))
    );

    const { result: tenthTokenUri } = simnet.callReadOnlyFn(
      "stxdev",
      "get-token-uri",
      [uintCV(10)],
      address2
    );

    expect(tenthTokenUri).toBeOk(
      someCV(stringAsciiCV("https://stxdev.xyz/token/10"))
    );
  });

  it("allows a token owner to transfer their token", () => {
    simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    const { result } = simnet.callPublicFn(
      "stxdev",
      "transfer",
      [uintCV(1), principalCV(address1), principalCV(address2)],
      address1
    );
    expect(result).toBeOk(boolCV(true));
  });

  it("charges a fee equal to 10% the current mint price for every nft transfer", () => {
    simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    const { events } = simnet.callPublicFn(
      "stxdev",
      "transfer",
      [uintCV(1), principalCV(address1), principalCV(address2)],
      address1
    );

    const expectedStxFeeTransfer = events[0];
    expect(expectedStxFeeTransfer.event).toBe("stx_transfer_event");
    expect(expectedStxFeeTransfer.data.amount).toBe("5000");

    for (let i = 0; i <= 100; i = i + 1) {
      simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    }

    const { events: newTransferEvents } = simnet.callPublicFn(
      "stxdev",
      "transfer",
      [uintCV(2), principalCV(address1), principalCV(address2)],
      address1
    );
    const updatedExpectedStxFeeTransfer = newTransferEvents[0];
    expect(updatedExpectedStxFeeTransfer.event).toBe("stx_transfer_event");
    expect(updatedExpectedStxFeeTransfer.data.amount).toBe("50000000");
  });

  it("does not allow a principal to transfer a token they do not own", () => {
    simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    const { result: firstMintFeeTx } = simnet.callPublicFn(
      "stxdev",
      "transfer",
      [uintCV(1), principalCV(address1), principalCV(address2)],
      address2
    );
    expect(firstMintFeeTx).toBeErr(uintCV(101));
  });

  it("shows who's the token owner given a token id", () => {
    simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    simnet.callPublicFn("stxdev", "mint", [principalCV(address2)], address1);
    simnet.callPublicFn("stxdev", "mint", [principalCV(address3)], address1);

    const { result: readOwnerToken1 } = simnet.callReadOnlyFn(
      "stxdev",
      "get-owner",
      [uintCV(1)],
      address1
    );
    expect(readOwnerToken1).toBeOk(someCV(principalCV(address1)));

    const { result: readOwnerToken2 } = simnet.callReadOnlyFn(
      "stxdev",
      "get-owner",
      [uintCV(2)],
      address1
    );
    expect(readOwnerToken2).toBeOk(someCV(principalCV(address2)));

    const { result: readOwnerToken3 } = simnet.callReadOnlyFn(
      "stxdev",
      "get-owner",
      [uintCV(3)],
      address1
    );
    expect(readOwnerToken3).toBeOk(someCV(principalCV(address3)));

    const { result: readOwnerToken4 } = simnet.callReadOnlyFn(
      "stxdev",
      "get-owner",
      [uintCV(4)],
      address1
    );
    expect(readOwnerToken4).toBeOk(noneCV());
  });

  it("shows what's the id of the last token that was minted", () => {
    for (let i = 0; i <= 100; i = i + 1) {
      simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    }
    const { result } = simnet.callReadOnlyFn(
      "stxdev",
      "get-last-token-id",
      [],
      address1
    );
    expect(result).toBeOk(uintCV(101));
  });

  it("increases a principal token balance on mint", () => {
    simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    const balanceForOwner = simnet.getMapEntry(
      "stxdev",
      "token-balance",
      tupleCV({ owner: principalCV(address1) })
    );
    expect(balanceForOwner).toBeSome(uintCV(1));

    simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);

    const balanceForOwnerAfterSecondMint = simnet.getMapEntry(
      "stxdev",
      "token-balance",
      tupleCV({ owner: principalCV(address1) })
    );
    expect(balanceForOwnerAfterSecondMint).toBeSome(uintCV(2));
  });

  it("decreases the owner and increases the recipient token balance on transfer", () => {
    simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    const ownerBalanceBeforeTransfer = simnet.getMapEntry(
      "stxdev",
      "token-balance",
      tupleCV({ owner: principalCV(address1) })
    );
    expect(ownerBalanceBeforeTransfer).toBeSome(uintCV(2));

    simnet.callPublicFn(
      "stxdev",
      "transfer",
      [uintCV(1), principalCV(address1), principalCV(address2)],
      address1
    );
    const ownerBalanceAfterFirstTransfer = simnet.getMapEntry(
      "stxdev",
      "token-balance",
      tupleCV({ owner: principalCV(address1) })
    );
    expect(ownerBalanceAfterFirstTransfer).toBeSome(uintCV(1));

    simnet.callPublicFn(
      "stxdev",
      "transfer",
      [uintCV(2), principalCV(address1), principalCV(address3)],
      address1
    );
    const ownerBalanceAfterSecondTransfer = simnet.getMapEntry(
      "stxdev",
      "token-balance",
      tupleCV({ owner: principalCV(address1) })
    );
    expect(ownerBalanceAfterSecondTransfer).toBeSome(uintCV(0));
  });

  it("correctly tells if a principal owns a token", () => {
    const { result: ownerWithoutBalance } = simnet.callReadOnlyFn(
      "stxdev",
      "is-token-owner",
      [principalCV(address1)],
      address1
    );
    expect(ownerWithoutBalance).toBeOk(boolCV(false));

    simnet.callPublicFn("stxdev", "mint", [principalCV(address1)], address1);
    const { result: ownerWithBalance } = simnet.callReadOnlyFn(
      "stxdev",
      "is-token-owner",
      [principalCV(address1)],
      address1
    );
    expect(ownerWithBalance).toBeOk(boolCV(true));

    simnet.callPublicFn(
      "stxdev",
      "transfer",
      [uintCV(1), principalCV(address1), principalCV(address2)],
      address1
    );
    const { result: ownerWithZeroBalance } = simnet.callReadOnlyFn(
      "stxdev",
      "is-token-owner",
      [principalCV(address1)],
      address1
    );
    expect(ownerWithZeroBalance).toBeOk(boolCV(false));
  });
});
