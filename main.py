import streamlit as st
import requests
from datetime import datetime
import json

# 配置頁面
st.set_page_config(
    page_title="HR AI Assistant",
    page_icon="👥",
    layout="wide"
)

# 設置標題
st.title("HR AI Assistant")
st.subheader("您的智能人力資源助手")

# 側邊欄
with st.sidebar:
    st.header("功能選單")
    page = st.radio(
        "選擇功能",
        ["HR 問答助手", "法規查詢", "知識庫管理"]
    )

# 主要內容區域
if page == "HR 問答助手":
    st.header("HR 問答助手")
    
    # 用戶輸入
    user_question = st.text_area("請輸入您的問題：", height=100)
    
    if st.button("提交問題"):
        if user_question:
            with st.spinner("正在思考中..."):
                try:
                    # TODO: 實現與後端 API 的整合
                    response = {"answer": "這是一個示例回答。實際功能開發中..."}
                    st.write("回答：", response["answer"])
                except Exception as e:
                    st.error(f"發生錯誤：{str(e)}")
        else:
            st.warning("請輸入問題！")

elif page == "法規查詢":
    st.header("法規查詢")
    
    # 搜索框
    search_term = st.text_input("搜索法規：")
    
    if st.button("搜索"):
        if search_term:
            with st.spinner("搜索中..."):
                try:
                    # TODO: 實現向量搜索功能
                    results = ["示例法規 1", "示例法規 2"]
                    for result in results:
                        st.write(result)
                except Exception as e:
                    st.error(f"搜索失敗：{str(e)}")
        else:
            st.warning("請輸入搜索關鍵詞！")

else:  # 知識庫管理
    st.header("知識庫管理")
    
    # 上傳文件
    uploaded_file = st.file_uploader("上傳文件到知識庫", type=["pdf", "txt", "doc", "docx"])
    
    if uploaded_file is not None:
        with st.spinner("處理文件中..."):
            try:
                # TODO: 實現文件處理和知識庫更新功能
                st.success("文件上傳成功！")
            except Exception as e:
                st.error(f"文件處理失敗：{str(e)}")
    
    # 顯示知識庫狀態
    st.subheader("知識庫狀態")
    # TODO: 實現知識庫狀態顯示
    st.info("文件總數：0\n最後更新時間：" + datetime.now().strftime("%Y-%m-%d %H:%M:%S")) 