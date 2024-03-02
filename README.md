# PAT.IO station

## CAST PAGE BEHAVIOUR

1º Caster submits a 'private_key' to an API and receives as response a 'public_address' (station address) that will be shown in the frontend. This private_key will be securely used by the backend to send the casting transactions. We need to do this in this Proof of Concept because wallets are slow to build and confirm transactions.

2º Caster will select a source to cast from, for this Proof of Concepto should be a mp4 video or mp3 audio format. This is submited in base64, adding the prefix 'PATIOstationAudio_' OR 'PATIOstationVideo_' and the suffix '_stationPATIO' and submits to the backend (API) through a _POST request.

3º The API will receive this ASCII message, converts it into HEX data, split it into 25 kilobytes 'blocks' and write it into a database table that is designed as follows:

 | autoincremental_id | HEX_data | gas_price | priority_fee | nonce | state | tx_hash | caster_identifier |
 |--------------------|----------|-----------|--------------|-------|-------|---------|-------------------|
```
HEX_data            The HEX_data to broadcast
gas_price           Starts at 1.1 and goes up by 10% up to 10, once is reached an empty HEX_data transaction (the last one) it will be sent and nonce moves to the next one for the next interaction.
priority_fee        Starts at 100 and goes up by 10% until nonce changes, no decimal values since is wei.
state               Is 0 if is not handled, is 2 if is being processed, is 1 if is completed.
caster_identifier   The private_key access information, we are not taking high security considerations in this DEMO because is a proof of concept, not neccessary.
```
4º A script that runs continuously reads this database table and processes the first available transaction for each Caster with state '0' and changes the state to '2'. BUT this happens only if there is no one in state '2', if not it will wait until the next one is at 0. When a transaction that was on '0' and then changed to '2' si completed, the states changes to 1.

5º Caster see in the frontend right boxes: Blocknative API with the streaming information (check-back) and received donations.

## TUNE IN PAGE BEHAVIOUR

1º The Viewer is consuming a node API (Blocknative) hearing the station address which checks continuously. The API is a service that is hearing the Mempool directly from a webhook and giving the frontend only the tx_hash and the HEX_data content of the transaction, which will be used by the frontend (no pre-processing to avoid speculations) and decoded to see the streamed media, for the live demo we'll use video streaming.

2º Once a new content is arriving it will be detected by the front-end dApp reading the HEX_data package starting with the prefix signature '504154494F73746174696F6E566', then it will start to "build" the streming information and wait the finalization of the streaming when the suffix '5F73746174696F6E504154494F' is found.

3º For processing the frontend which has a built in HTML player will use JavaScript to remove the prefix and suffix to leave the HEX information ready to be converted to from HEX to base64, removing the 0x from each received package as well, and then converted from base64 to the binary needed to be processed by the browser.

4º Then it converts the 'base64' to the file to play, showing the right DIV (for audioplayer or videoplayer) inside the playing box.

5º For this demo the TUNE-IN page will show the audio or video version of the player depending on the detected incoming streaming.
