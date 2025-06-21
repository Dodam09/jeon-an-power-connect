import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">주안전기공사</h3>
            <p className="text-gray-300">
              인천 및 수도권 중심의
              <br />
              전기 기술 전문 인력 매칭 서비스
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">연락처</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-400" />
                <span>010-4325-0482</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                <span>fog5515@naver.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-blue-400 mt-1" />
                <span>인천시 미추홀구 미추홀대로 673, 2층</span>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">서비스 지역</h4>
            <div className="text-gray-300">
              <p>• 인천 전 지역</p>
              <p>• 서울 전 지역</p>
              <p>• 경기 전 지역</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 주안전기공사. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
