
import React from 'react';
import { MapPin, Building, Award, Users } from 'lucide-react';

const CompanyInfo = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            믿을 수 있는 전기 인력 전문가
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            인천 및 수도권 중심의 전기 기술 전문 인력 매칭 서비스
          </p>
        </div>
        
        {/* Company Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Company Info */}
          <div className="space-y-8">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="mr-3 h-6 w-6 text-blue-600" />
                주안전기공사
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">본사 위치</p>
                    <p className="text-gray-600">인천시 미추홀구 미추홀대로 673, 2층</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Award className="mr-3 h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">전문 분야</p>
                    <p className="text-gray-600">전기 설비 시공, 유지보수, 인력 공급</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="mr-3 h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">서비스 지역</p>
                    <p className="text-gray-600">인천, 서울, 경기 전 지역</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Features */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-semibold text-gray-900 mb-2">신속한 매칭</h4>
              <p className="text-gray-600">필요한 인력을 빠르게 연결해드립니다</p>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-semibold text-gray-900 mb-2">검증된 인력</h4>
              <p className="text-gray-600">자격증과 경력을 검증한 전문 인력만 추천</p>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-semibold text-gray-900 mb-2">맞춤형 서비스</h4>
              <p className="text-gray-600">프로젝트 규모와 요구사항에 맞는 인력 공급</p>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-semibold text-gray-900 mb-2">안전 관리</h4>
              <p className="text-gray-600">산업안전교육 이수자만 연결하여 안전 보장</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
