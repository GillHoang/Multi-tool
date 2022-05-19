module.exports = {
    update: {
        newUpdate: "Hiện tại đã có version mới, vui lòng cập nhật",
        infoUpdate: "Thông tin update:",
        descriptionUpdate: "Mô tả",
        download: "Dowload ở đây",
        replitClone: "Clone replit",
        newPatchUpdate: "Đã có bản vá mới, vui lòng cập nhật: ",
        patchUpdateInfo: "Thông tin bản vá",
        noUpdate: "Không có bản update mới"
    },
    WH: {
        invalidWH: "Sai link webhook vui lòng kiểm tra ở đây https://github.com/hocsinhgioitoan/Mutil-tool#env-required",
    },
    aniGame: {
        claimedCard: (name) => `Đã nhận thẻ ${name}`
    },
    ready: {
        login: "Đăng nhập vào ",
        mobileStatus: " Nếu bạn không thấy tài khoản của mình hiển thị trạng thái di động vì tài khoản hiển thị với người khác chứ không hiển thị với bạn. \n Sẽ mất một lúc để tài khoản hiển thị trạng thái di động, vì vậy hãy kiên nhẫn",
        joinVoice: (voiceName, guildName) => `Joined voice ` + voiceName + " in " + guildName,
        joinAgain: "Tham gia lại voice",
        voiceOff: "Đã tắt mode auto voice",
        rpWarn: "Nếu bạn không thấy hình ảnh lớn và nhỏ ở rich presence, vui lòng đợi một lúc để hình ảnh tải!",
        sendMessage: (name) => "Đã gửi tin nhắn spam " + `Kênh: ` + name 
    },
    settings: {
        invalidSetting: (mode) => `Setting không hợp lệ ${mode}`
    },
    giveaway: {
        joinGiveaway: "Bạn đã tham gia vào một giveaway ở ",
        winGiveaway: "Bạn đã win giveway ở "
    }
}